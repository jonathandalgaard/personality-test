<?php

namespace Drupal\tw_quiz\Controller;

use Drupal\node\NodeInterface;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Cache\CacheableJsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Provides endpoints for getting quiz questions.
 */
class QuizController extends ControllerBase {

  /**
   * Gets a list of available quizzes.
   *
   * @return \Drupal\Core\Cache\CacheableJsonResponse
   *   The list of available quizzes.
   */
  public function getQuizzes() {
    $node_storage = $this->entityTypeManager()->getStorage('node');
    $quiz_ids = $node_storage->getQuery()
      ->accessCheck()
      ->condition('type', 'quiz')
      ->condition('status', NodeInterface::PUBLISHED)
      ->execute();
    if (empty($quiz_ids)) {
      return new CacheableJsonResponse([]);
    }

    $quizzes = [];
    /** @var \Drupal\node\NodeInterface $node */
    foreach ($node_storage->loadMultiple($quiz_ids) as $node) {
      $quizzes[] = [
        'id' => $node->id(),
        'title' => $node->getTitle(),
      ];
    }

    $response = new CacheableJsonResponse($quizzes);
    $cache_metadata = new CacheableMetadata();
    $cache_metadata->addCacheTags(['node_list:quiz']);
    $response->addCacheableDependency($cache_metadata);
    return $response;
  }

  /**
   * Get quiz questions from a given node.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The quiz node to get the questions from.
   *
   * @return \Drupal\Core\Cache\CacheableJsonResponse
   *   A JSON response containing all the questions, if any.
   */
  public function getQuestions(NodeInterface $node) {
    if ($node->bundle() != 'quiz') {
      throw new BadRequestHttpException('Invalid quiz node provided');
    }

    $questions = [];
    foreach ($node->get('field_questions')->referencedEntities() as $question) {
      $options = [];
      foreach ($question->get('field_multiple_choice_options')->referencedEntities() as $option) {
        $options[] = [
          'id' => $option->id(),
          'title' => $option->get('field_title')->value,
          'score' => $option->get('field_score')->value,
        ];
      }

      $questions[] = [
        'title' => $question->get('field_title')->value,
        'options' => $options,
      ];
    }

    $response = new CacheableJsonResponse($questions);
    $response->addCacheableDependency($node);
    return $response;
  }

  /**
   * Get quiz result based on a given score.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The http request.
   * @param \Drupal\node\NodeInterface $node
   *   The quiz node to get the results from.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   A JSON response containing the quiz result.
   */
  public function getResult(Request $request, NodeInterface $node) {
    if ($node->bundle() != 'quiz') {
      throw new BadRequestHttpException('Invalid quiz node provided');
    }

    if (!$request->query->has('score')) {
      throw new BadRequestHttpException('No score provided');
    }

    $score = $request->query->get('score');
    $final_result = [];
    foreach ($node->get('field_results')->referencedEntities() as $result) {
      if ($score > $result->get('field_score')->value) {
        continue;
      }

      if (!$final_result) {
        $final_result = $result;
      }
      elseif ($final_result->get('field_score')->value > $result->get('field_score')->value) {
        $final_result = $result;
      }
    }

    return new JsonResponse([
      'title' => $final_result->get('field_title')->value,
      'text' => $final_result->get('field_text')->value,
    ]);
  }

}

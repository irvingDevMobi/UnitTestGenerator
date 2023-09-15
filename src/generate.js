const {
  readFileAsCode,
  contentMsg,
  generateUnitTest,
  createTestSuitFile,
} = require("./chatgpt-api");

const framework = 'Dart';
const path = "../../1065-relevant_superapp_frontend-fr/modules/rlv_health/lib/domain/middlewares/";
const file = "get_health_home_menu_items_enabled_map_middleware.dart";
const testPathExample = "../../1065-relevant_superapp_frontend-fr/modules/rlv_health/test/domain/middlewares/";
const fileExample = "answer_hada_question_middleware_test.dart";
const repositoryPath = "../../1065-relevant_superapp_frontend-fr/modules/rlv_health/lib/domain/repositories/";
const repositoryFile = "health_repository.dart";

(async () => {
  try {
    const code = await readFileAsCode(path, file);
    const testExample = await readFileAsCode(testPathExample, fileExample);
    const repositoryDefinition = await readFileAsCode(repositoryPath, repositoryFile);
    let prompt = await contentMsg(framework, code, testExample, repositoryDefinition);
    let output = await generateUnitTest(prompt);
    await createTestSuitFile(file, output);
  } catch (error) {
    console.error(error);
  }
})();

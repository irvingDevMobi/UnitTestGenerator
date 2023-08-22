const {
  readFileAsCode,
  contentMsg,
  generateUnitTest,
  createTestSuitFile,
} = require("./chatgpt-api");

const path =
  "../../users-be/src/main/java/com/speedcast/sigma/users/usermanagement/controllers/";
const file = "RolesController.java";
const framework = 'Java';

(async () => {
  try {
    const code = await readFileAsCode(path, file);
    let prompt = await contentMsg(framework, code);
    let output = await generateUnitTest(prompt);
    await createTestSuitFile(file, output);
  } catch (error) {
    console.error(error);
  }
})();
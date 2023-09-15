const OpenAI = require('openai'),
 fs = require('fs'),
 path = require('path');

require("dotenv").config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
  async contentMsg(framework, code, testExample, repositoryDefinition) {
    return "Could you generate a unit tests class in " + framework +" language for the 'run' function?"
        + "Showing at least two unit tests per function, containing relevant cases when the 'store' object dispatches an action, "
        + "use GenerateNiceMocks instead of GenerateMocks for dependencies."
        + "and please DON'T use argument matcher any or anyNamed, create a fake instance of the arguments instead."
        + "The source code is the following: " + code
        + " Here is an example of the expected structure for the unit tests: " + testExample
        // If we can use gpt-4 we can even send the repository definition. If not, comment out the next line.
        + " And here is the definition of the repository: " + repositoryDefinition
        ;
  },

  async readFileAsCode(filePath, file) {
    try {
      let folder = path.join(filePath);
      let fileData = fs.readFileSync(path.join(__dirname, folder + file), 'utf-8');
      return fileData;
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  },

  async generateUnitTest(prompt) {
    const spinner = (await import("ora"))
      .default("Please Wait Generating Unit Test...")
      .start();

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 4097,
      });

      const { message } = response.choices[0];
      output = message.content;
      spinner.succeed("Unit Tests generated");
      return output;
    } catch (error) {
      spinner.fail(`Error generating unit test: ${error}`);
    }
  },

  async createTestSuitFile(file, output) {
    //path where unit test file is created
    const outputFolder = "./output/";
    const testFile = file.replace(/(\.dart)$/, '_test$1');
    let fileName = path.join(outputFolder + testFile);
    try {
      fs.writeFileSync(fileName, output);
      console.log(`Message written to file: ${fileName}`);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  },
}

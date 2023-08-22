# PoC-Unit-Test-Generator
This project was created as a proof of concept using openai to generate unit tests for any framework (Technology) by providing a path and a file name.

### Instalation
Clone this repository into your local machine
```
git@github.com:Carlos-Veloz/UnitTestGenerator.git
cd UnitTestGenerator
```
Install dependencies by running
```
npm install
```

## Getting started
Once you have installed all dependencies required and added this PoC as another folder to the project where you want to create the unit tests from, just go to generate.js and provide next information:

Folder for source code
```
const path = "..relative path to the folder"
```
File's name and extension
```
const file = "FileName.Ext"
```
And finally indicate the technology
```
const framework = "Java"
```

Unit Test will be generated in /output/UT{FileName.ext}
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const members = [];
const ids = [];

function question() {
  function addManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is your manager's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is your manager's id?",
        },
        {
          type: "input",
          name: "email",
          message: "What is your manager's email address?",
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is your manager's office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.managerOfficeNumber
        );
        members.push(manager);
        ids.push(answers.id);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message:
            "What is the role of the team member that you'd like to add?",
          choices: ["Engineer", "Intern", "Build Team"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.choice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the engineer's name?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is the engineer's id?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the engineer's email address?",
        },
        {
          type: "input",
          name: "github",
          message: "What is the engineer's GitHub username?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.engineerId,
          answers.email,
          answers.github
        );
        members.push(engineer);
        ids.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the intern's name?",
        },
        {
          type: "input",
          name: "id",
          message: "what is the intern's id?",
        },
        {
          type: "input",
          name: "email",
          message: "what is the intern's email address?",
        },
        {
          type: "input",
          name: "school",
          message: "What is the intern's school name?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        members.push(intern);
        ids.push(answers.id);
        createTeam();
      });
  }

  function buildTeam() {
    fs.writeFileSync(outputPath, render(members), "utf-8");
  }

  addManager();
}

question();

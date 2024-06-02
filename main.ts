#! /usr/bin/env node

import inquirer from "inquirer";

class student {
    id: string;
    name: string;
    coursesEnrolled: string[];
    feesAmount: number;

    constructor(id: string, name: string, coursesEnrolled: string[], feesAmount: number){
      this.id = id
      this.name = name
      this.coursesEnrolled = coursesEnrolled
      this.feesAmount = feesAmount  
    }
}

let baseId = 10000
let studentId: string = "";
let continueEnrollement = true;

let students: student[] = []




do{
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    })

    if(action.ans === "Enroll a student"){
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter your name:"
        })

        let trimedStudentName = (studentName.ans).trim().toLowerCase()
        let studentNameCheck = students.map(obj => obj.name)

        if(studentNameCheck.includes(trimedStudentName) === false){
            if(trimedStudentName !== ""){
                baseId++
                studentId = "STID" + baseId
    
                console.log("\n\tyour account has been created");
                console.log(`Welcome, ${trimedStudentName}!`);
        let course = await inquirer.prompt({
            type: "list",
            name:"ans",
            message: "please select a course",
            choices: ["IT","English","Cooking"]
        })   


        let courseFees = 0;
        switch(course.ans) {
            case "IT":
            courseFees = 5000;
            break;

            case "English":
            courseFees = 500;
            break;

            case "Cooking":
            courseFees = 200;
            break;
        }

        let courseConfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Do youwant to Enroll in this course"
        })


        if(courseConfirm.ans === true){
            let Student = new student(studentId, trimedStudentName, [course.ans], courseFees)

            students.push(Student)

            console.log("you have enrolled in this course");
            
        }
        }else{
            console.log("invalid Name");
            
        }
        }else{
            console.log("This name is already exists");
            
        }
    
    }
   else if(action.ans === "Show student status"){
    if(students.length !== 0){
        let studentNamesCheck = students.map(e => e.name)


        let selectedStudent = await inquirer.prompt({
            type: "list",
            name: "ans",
            message: "please select name",
            choices: studentNamesCheck
        })

        let foundStudent = students.find(Student => Student.name === selectedStudent.ans)

        console.log("Student information");
        console.log(foundStudent);
        console.log("\n");
        
        }else{
            console.log("Record is Empty");
            
        }
     }
    
   let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want to continue?"
   })

   if(userConfirm.ans === false){
    continueEnrollement = false
   }
}while(continueEnrollement)
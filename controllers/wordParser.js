const fs = require('fs');
var mammoth = require("mammoth");

const QuestionDetail = require('../models/QuestionDetail')
const SubQuestions = require('../models/SubQuestions')




// WordParser ********************************************************
module.exports = {
  // helper function

  replaceAll: (str, find, replacement) => {
      let modifiedStr = str.replace(new RegExp(find, 'g'), replacement);
      return modifiedStr;
  },

  // helper function
  getImage: (columnData, index) => {
    let image = columnData.substring(index);
    image = module.exports.replaceAll(image, '</td>', '');
    image = module.exports.replaceAll(image, '</tr>', '');

    return image;
  },

  // get all question, given- standard, subject, chapter
  getQuesList: async(req, res) => {
        try {
            const quesData = await QuestionDetail.find(
                    {standard: req.params.standard,
                    subject: req.params.subject,
                    chapter: req.params.chapter});
            
            var arrSubQuesId;

            for(var i=0; i<quesData.length; i++)
            {
                arrSubQuesId = quesData[i].subQuestions;
                quesData[i].subQuestions = [];

                for(var j=0; j<arrSubQuesId.length; j++)
                {
                    const subQuesData = await SubQuestions.findById(arrSubQuesId[j]);

                    quesData[i].subQuestions.push(subQuesData);
                }
            }
            res.status(200).json(quesData);
        }
        catch(e) {
            res.status(500).json(e);
        }
    },

    // get question by id
    getQues: async(req, res) => {
        var arrSubQuesId;
        try {
            // get question data
            const quesData = await QuestionDetail.findById(req.params.quesId);

            console.log('ques: ', quesData);
                arrSubQuesId = quesData.subQuestions;
                quesData.subQuestions = [];
                // get subquestion(s)
                for(var i=0; i<arrSubQuesId.length; i++) {    
                    const subQuesData = await SubQuestions.findById(arrSubQuesId[i]);
                    
                    quesData.subQuestions.push(subQuesData);
                    console.log('arrOfSubQues in: ', quesData);
                }
                console.log('record: ', quesData);
                res.status(200).json(quesData);
        }
        catch(e) {
            res.status(500).json(e);
        }
    },

    getAllQues: async(req, res) => {
        try {
            const quesData = await QuestionDetail.find(
                    {}).populate("standard","_id name").populate("subject","_id name").populate("chapter","_id name").populate("examtype","_id name");
            console.log('quesdata: ', quesData);
            
            var arrSubQuesId;

            for(var i=0; i<quesData.length; i++)
            {
                arrSubQuesId = quesData[i].subQuestions;
                quesData[i].subQuestions = [];

                for(var j=0; j<arrSubQuesId.length; j++)
                {
                    const subQuesData = await SubQuestions.findById(arrSubQuesId[j]);

                    quesData[i].subQuestions.push(subQuesData);
                }
            }
            res.status(200).json(quesData);
        }
        catch(e) {
            res.status(500).json(e);
        }
    },

    // create a single Question **********************************

createQuest: async(req, res) => {
    const quesId = req.body._id;
console.log("hy",req.body)

var subQuesData=req.body.subQuesData
var subQuestions=[]
var subQuestionid=[]

        for(var i=0; i<subQuesData.length; i++) {
            const updatedSubQuestions = await SubQuestions.create( {
                     
                            question: req.body.subQuesData[i].question,
                            quesType: req.body.subQuesData[i].quesType,
                            options: req.body.subQuesData[i].options,
                            answer: req.body.subQuesData[i].answer,
                            solution: req.body.subQuesData[i].solution,
                            positiveMarks: req.body.subQuesData[i].positiveMarks,
                            negativeMarks: req.body.subQuesData[i].negativeMarks
                        
                });
            subQuestions.push(updatedSubQuestions);
            subQuestionid.push(updatedSubQuestions._id)

        }
        const updatedQuestion = await QuestionDetail.create( {
             
                    standard: req.body.standard,
                    examType: req.body.examType,
                    subject: req.body.subject,
                    chapter: req.body.chapter,
                    topic: req.body.topic,
                    subTopic: req.body.subTopic,
                    question: req.body.question,
                    quesType: req.body.quesType,
                    subQuestions:subQuestionid
            
        }); 
        updatedQuestion.subQuestions=subQuestions

        res.status(200).json({
updatedQuestion
        })
        
        // get updated ques data
        console.log("updated")
        module.exports.createQuest(req, res);
    // }
},


    // update question by id
    updateQues: async(req, res) => {
        const quesId = req.body._id;
        req.params.quesId = quesId;
console.log("hy",req.body)
        const updatedQuestion = await QuestionDetail.findByIdAndUpdate(quesId, {
                    $set: {
                        standard: req.body.standard,
                        examType: req.body.examType,
                        subject: req.body.subject,
                        chapter: req.body.chapter,
                        topic: req.body.topic,
                        subTopic: req.body.subTopic,
                        question: req.body.question,
                        quesType: req.body.quesType
                    }
            }); 

        if(updatedQuestion) {
            var arrSubQuesId = updatedQuestion.subQuestions;
            // updatedQuestion.subQuestions = [];

            for(var i=0; i<arrSubQuesId.length; i++) {
                const updatedSubQuestions = await SubQuestions.findByIdAndUpdate(arrSubQuesId[i], {
                            $set: {
                                question: req.body.subQuestions[i].question,
                                quesType: req.body.subQuestions[i].quesType,
                                options: req.body.subQuestions[i].options,
                                answer: req.body.subQuestions[i].answer,
                                solution: req.body.subQuestions[i].solution,
                                positiveMarks: req.body.subQuestions[i].positiveMarks,
                                negativeMarks: req.body.subQuestions[i].negativeMarks
                            }
                    });
            }
            
            // get updated ques data
            console.log("updated")
            module.exports.getQues(req, res);
        }
    },

    // delete question by id
    deleteQues: async(req, res, deleteCounter = -1) => {
        try {
            const quesId = req.params.quesId;
            var arrSubQuesId;

            // remove question
            const deletedQues = await QuestionDetail.findByIdAndDelete(quesId); 


            if(deletedQues) {
                const {standard, subject, chapter} = deletedQues;

                req.params.standard = standard;
                req.params.subject = subject;
                req.params.chapter = chapter;

                arrSubQuesId = deletedQues.subQuestions;

                // remove subquestion(s)
                for(var i=0; i<arrSubQuesId.length; i++) {    
                    const deletedSubQues = await SubQuestions.findByIdAndDelete(arrSubQuesId[i]);
                }

                var deleteSingleRecord = true;

                // in case of deleteAll, call getAllQues at last
                if(deleteCounter > -1 && deleteCounter == req.params.totalDeletedFlag) {
                    console.log('deletecounter: ', req.params.deleteCounter);

                    // get all question data
                    module.exports.getQuesList(req, res);
                }
                else if(deleteSingleRecord == true && deleteCounter == -1) {
                    console.log('deleteSingleRecord: ', deleteSingleRecord);

                    // get all question data
                    module.exports.getQuesList(req, res);
                }
                
            } else {
                res.json({error: 'error in deleting question'});
            }
        }
        catch(e) {
            res.status(500).json(e);
        }
    },

    // delete all questions by id
    deleteAllQues: async(req, res) => {
        try {
            var arrQuesId = req.params.quesId.split(',');
            console.log('arrQuesId: ', arrQuesId);

            req.params.totalDeletedFlag = (arrQuesId.length - 1);

            console.log('req.params.totalDeletedFlag: ', req.params.totalDeletedFlag);

            for(var j=0; j<arrQuesId.length; j++) {
                req.params.quesId = arrQuesId[j];
                const result = await module.exports.deleteQues(req, res, j);
            }
        }
        catch(e) {
            res.status(500).json(e);
        }
    },

  // parse docx file
  extract: async(req, res) => {
      var quesData;
      var options = {
        convertImage: mammoth.images.imgElement(function(image) {
            return image.read("base64").then(function(imageBuffer) {
              return {
                src: "data:" + image.contentType + ";base64," + imageBuffer
              };
            });
        })
      };

      var filePath = req.file.path;
      var quesPaperInfo = req.body;
console.log("detecting file path:",filePath,req.file.path)
      // convert docx to html
      await mammoth.convertToHtml({path: req.file.path}, options)
      .then(function(result){
          var htmlData = result.value; // The generated HTML
          var messages = result.messages; // Any messages, such as warnings during conversion

          return htmlData;
      }).then(function(htmlData) {
          quesData = module.exports.parseQuesData(htmlData, quesPaperInfo);
      });
      return res.json(quesData);
  },

  // docx parsing logic
  parseQuesData: (htmlData, quesPaperInfo) => {
      // remove paragraph tag from html
      htmlData = module.exports.replaceAll(htmlData, "<p>", '');
      htmlData = module.exports.replaceAll(htmlData, "</p>", '');

      console.log('htmlData',htmlData);

      // convert html to json to store in DB
      var table = htmlData.split('<table>');
      let arrOfQuesData = [], arrOfSubQuesId = [];

      for(var i=1; i<table.length; i++)
      {
          let questionDetail = new QuestionDetail();
          let subQuesObj = new SubQuestions();

          let objQuesData = {};
          let arrOfSubQuesData = [];
          
          if((((table[i].includes('multiple choice') || table[i].includes('multiple_choice')))
              || (table[i].includes('integer'))
              || (table[i].includes('fill_ups') || table[i].includes('fill ups'))
              || (table[i].includes('true_false') || table[i].includes('true false')))
              && (!table[i].includes('comprehension')))
          {
              var row = table[i].split('<tr>');
              for(var j=1; j<row.length; j++)
              {
                  if(row[j].includes('Question')) {
                      var separators = ['<td>', '<td '];
                      var column = row[j].split(new RegExp(separators.join('|'), 'g'));

                      var content = '';
                      for(var k=1; k<column.length; k++) {
                          // if picture
                          if(column[k+1].indexOf('<img ') != -1) {
                              let index = column[k+1].indexOf('<img ');
                              let image = module.exports.getImage(column[k+1], index);

                              subQuesObj.question.photo = image;
                              column[k+1] = column[k+1].substring(0, index);
                          }
                          var data = column[k+1].split('</td>');

                          if(data[0].includes('colspan')) {
                              data = data[0].split('\">');
                              content += data[1];
                          }
                          else {
                              content += data[0];
                          }
                          k = k+1;

                          subQuesObj.question.quesDesc = content;
                          questionDetail.question = content;
                      }
                  }
                  else if(row[j].includes('Type')) {
                      subQuesObj.quesType = row[j].includes('multiple_choice')? 'multiple_choice' : 
                              row[j].includes('integer')? 'integer' : row[j].includes('fill_ups')? 'fill_ups' :
                              row[j].includes('true_false')? 'true_false' : '';

                      questionDetail.quesType = subQuesObj.quesType;
                  }
                  else if(row[j].includes('Options') || row[j].includes('Option')) {
                      var separators = ['<td>', '<td '];
                      var column = row[j].split(new RegExp(separators.join('|'), 'g'));

                      var content = '';
                      for(var k=1; k<column.length-1; k++) {
                          var data = column[k+1].split('</td>');

                          if(data[0].includes('colspan')) {
                              data = data[0].split('\">');
                              content += data[1];
                          }
                          else {
                              content += data[0];
                          }
                          k = k+1;

                          let isCorrectVal = column[column.length-1].includes('incorrect') ? 'incorrect' : 'correct';
                          subQuesObj.options.push({answer: content, isCorrect: isCorrectVal});
                      }
                  }
                  else if(row[j].includes('Answer')) {
                      var separators = ['<td>', '<td '];
                      var column = row[j].split(new RegExp(separators.join('|'), 'g'));

                      // if picture
                      if(column[2].indexOf('<img ') != -1) {
                          let index = column[2].indexOf('<img ');
                          let image = module.exports.getImage(column[2], index);

                          subQuesObj.answer.photo = image;
                          column[2] = column[2].substring(0, index);
                      }
                      var data = column[2].split('</td>');

                      if(data[0].includes('colspan')) {
                          data = data[0].split('\">');
                          subQuesObj.answer.ansDesc = data[1];
                      }
                      else {
                          subQuesObj.answer.ansDesc = data[0];
                      }
                  }
                  else if(row[j].includes('Solution')) {
                      var separators = ['<td>', '<td '];
                      var column = row[j].split(new RegExp(separators.join('|'), 'g'));

                      // if picture
                      if(column[2].indexOf('<img ') != -1) {
                          let index = column[2].indexOf('<img ');
                          let image = module.exports.getImage(column[2], index);
                          
                          subQuesObj.solution.photo = image;
                          column[2] = column[2].substring(0, index);
                      }
                      var data = column[2].split('</td>');

                      if(data[0].includes('colspan')) {
                          data = data[0].split('\">');
                          subQuesObj.solution.solnDesc = data[1];
                      }
                      else {
                          subQuesObj.solution.solnDesc = data[0];
                      }
                  }
                  else if(row[j].includes('Marks')) {
                      var separators = ['<td>', '<td '];
                      var column = row[j].split(new RegExp(separators.join('|'), 'g'));

                      for(var k=2; k<column.length; k++) {
                          var data = column[k].split('</td>');

                          if(data[0].includes('colspan')) {
                              data = data[0].split('\">');
                              column[k] = data[1];
                          }
                          else {
                              column[k] = data[0];
                          }
                      }
                      subQuesObj.positiveMarks = column[2];
                      subQuesObj.negativeMarks = column[3];
                  }
              }
          }
          else if(table[i].includes('comprehension')) {
              var quesCount = 0;
              var row = table[i].split('<tr>');

              for(var j=1; j<row.length; j++)
              {
                  var separators = ['<td>', '<td '];
                  var column = row[j].split(new RegExp(separators.join('|'), 'g'));

                  if(j == 1) {
                      arrOfSubQuesId = [];

                      var data = column[2].split('</td>');
                      if(data[0].includes('colspan')) {
                          data = data[0].split('\">');
                          questionDetail.question = data[1];
                      }
                      else {
                          questionDetail.question = data[0];
                      }
                  }
                  else if(j == 2) {
                      var data = column[2].split('</td>');
                      if(data[0].includes('colspan')) {
                          data = data[0].split('\">');
                          questionDetail.quesType = data[1];
                      }
                      else {
                          questionDetail.quesType = data[0];
                      }
                  }
                  else {
                      if(row[j].includes('Question')) {
                          quesCount += 1;

                          // push the previous question object when new question encounters
                          if(quesCount > 1) {
                              // save sub questions schema in DB
                              subQuesObj.save((err, result) => {
                                  if(err) {
                                      return err;
                                  }
                                  arrOfSubQuesId.push(result._id);
                              });
                              // array of sub question data
                              arrOfSubQuesData.push(subQuesObj);
                              subQuesObj = new SubQuestions();
                          }

                          var content = '';
                          for(var k=1; k<column.length; k++) {
                              // if picture
                              if(column[k+1].indexOf('<img ') != -1) {
                                  let index = column[k+1].indexOf('<img ');
                                  let image = module.exports.getImage(column[k+1], index);

                                  subQuesObj.question.photo = image;
                                  column[k+1] = column[k+1].substring(0, index);
                              }
                              var data = column[k+1].split('</td>');

                              if(data[0].includes('colspan')) {
                                  data = data[0].split('\">');
                                  content += data[1];
                              }
                              else {
                                  content += data[0];
                              }
                              k = k+1;

                              subQuesObj.question.quesDesc = content;
                          }
                      }
                      else if(row[j].includes('Type')) {
                          subQuesObj.quesType = row[j].includes('multiple_choice')? 'multiple_choice' : 
                                  row[j].includes('integer')? 'integer' : row[j].includes('fill_ups')? 'fill_ups' :
                                  row[j].includes('true_false')? 'true_false' : '';
                      }
                      else if(row[j].includes('Options') || row[j].includes('Option'))
                      {
                          var content = '';
                          for(var k=1; k<column.length-1; k++) {
                              var data = column[k+1].split('</td>');

                              if(data[0].includes('colspan')) {
                                  data = data[0].split('\">');
                                  content += data[1];
                              }
                              else {
                                  content += data[0];
                              }
                              k = k+1;

                              let isCorrectVal = column[column.length-1].includes('incorrect') ? 'incorrect' : 'correct';
                              subQuesObj.options.push({answer: content, isCorrect: isCorrectVal});
                          }
                      }
                      else if(row[j].includes('Answer')) {
                          // if picture
                          if(column[2].indexOf('<img ') != -1) {
                              let index = column[2].indexOf('<img ');
                              let image = module.exports.getImage(column[2], index);

                              subQuesObj.answer.photo = image;
                              column[2] = column[2].substring(0, index);
                          }
                          
                          var data = column[2].split('</td>');

                          if(data[0].includes('colspan')) {
                              data = data[0].split('\">');
                              subQuesObj.answer.ansDesc = data[1];
                          }
                          else {
                              subQuesObj.answer.ansDesc = data[0];
                          }
                      }
                      else if(row[j].includes('Solution')) {
                          // if picture
                          if(column[2].indexOf('<img ') != -1) {
                              let index = column[2].indexOf('<img ');
                              let image = module.exports.getImage(column[2], index);
                              
                              subQuesObj.solution.photo = image;
                              column[2] = column[2].substring(0, index);
                          }
                          var data = column[2].split('</td>');

                          if(data[0].includes('colspan')) {
                              data = data[0].split('\">');
                              subQuesObj.solution.solnDesc = data[1];
                          }
                          else {
                              subQuesObj.solution.solnDesc = data[0];
                          }
                      }
                      else if(row[j].includes('Marks')) {
                          for(var k=2; k<column.length; k++) {
                              var data = column[k].split('</td>');

                              if(data[0].includes('colspan')) {
                                  data = data[0].split('\">');
                                  column[k] = data[1];
                              }
                              else {
                                  column[k] = data[0];
                              }
                          }
                          subQuesObj.positiveMarks = column[2];
                          subQuesObj.negativeMarks = column[3];
                      }
                  }
              }
          }

          // insert question paper details
          questionDetail.standard = quesPaperInfo.standard;
          questionDetail.examType = quesPaperInfo.examType;
          questionDetail.subject = quesPaperInfo.subject;
          questionDetail.chapter = quesPaperInfo.chapter;
          questionDetail.topic = quesPaperInfo.topic;
          questionDetail.subTopic = quesPaperInfo.subTopic;

          // prepare json to return
          objQuesData = questionDetail;

          if(questionDetail.quesType.includes('comprehension')) {
              // array of sub question data
              arrOfSubQuesData.push(subQuesObj);

              //insert the last question
              subQuesObj.save((err, result) => {
                  if(err) {
                      return err;
                  }

                  arrOfSubQuesId.push(result._id);

                  questionDetail.subQuestions = arrOfSubQuesId;
                  questionDetail.save((err, result) => {
                      if(err) {
                          return err;
                      }
                  });
              });

              // insert data in json object
              objQuesData.subQuestions = arrOfSubQuesData;
          }
          else {
              subQuesObj.save((err, result) => {
                  if(err) {
                      return err;
                  }
              });

              questionDetail.subQuestions.push(subQuesObj);

              questionDetail.save((err, result) => {
                  if(err) {
                      return err;
                  }
              });
          }
          arrOfQuesData.push(objQuesData);
      }
      console.log('arrOfQuesData: ', arrOfQuesData);
      return arrOfQuesData;
  }
};

module.exports;
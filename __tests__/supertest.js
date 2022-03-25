const request = require('supertest');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Recipe = require('../server/models/RecipeModel.js');
const User = require('../server/models/UserModel.js');

const server = 'http://localhost:3000';

function deleteRecipe() {
  Recipe.findOneAndDelete({ name: 'JESTtestUniqueName', query: 'blueberry' }, (err, result) => {
    if (err){
      console.log('deleteRecipe error ', err);
    } else {
      console.log('deleted recipe: ', result);
    }
  });
  return
}

function getTestID() {
  Recipe.findOne({ name: 'JESTtestUniqueName', query: 'blueberry' }, (err, result) => {
    if (err){
      console.log('getTestID error ', err);
    } else {
      console.log('result of getTestID ', result._id)
    }
  })
  return
}
describe('Route Integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      })
    })
  });
  describe('/recipes', () => {
    const testRecipe = { name: 'JESTtestUniqueName', query: 'blueberry' };
    
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/recipes')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
      it('recipes from the database are in the body of the response', () => {
        return request(server)
          .get('/recipes')
          .then((response) => {
            expect(Array.isArray(response.body)).toEqual(true)
          })
      });
    });

    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/recipes')
          .send(testRecipe)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then(response => {
            deleteRecipe();
          })
      });
      it('new recipe is in the body of the response', () => {
        return request(server)
          .post('/recipes')
          .send(testRecipe)
          .then((response) => {
            // deleteRecipe();
            getTestID();
            expect(response.body).toEqual(
              expect.objectContaining({name: 'JESTtestUniqueName'}),
              expect.objectContaining({query: 'blueberry'})
            )
          })
      });
      it('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
          .post('/recipes')
          .send('invalid request')
          .expect(400)
          .then(res => {
            expect(res.error).not.toEqual(false);
          })
      });
    });

    // Need to figure out how to do this
      /* Problem: each database entry has a unique ID so can't send the expected req.body of 
      {
        id: 'database id',
        name: 'recipename',
        query: 'ingredient1, ingredient2, etc'
      } */
    describe('PUT', () => {
      xit('responds with 200 status and application/json content type', () => {
        return request(server)
          .put('/recipes')
          .send(testRecipe)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
      it('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
          .put('/recipes')
          .send('invalid request')
          .expect(400)
          .then(res => {
            expect(res.error).not.toEqual(false);
          })
      });
    })

    describe('DELETE', () => {
      xit('responds with 200 status', () => {
        return request(server)
          .delete('/recipes')
          .send(toBeDeleted)
          .expect(200)
      })
      it('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
          .delete('/recipes/200')
          .expect(400)
          .then(res => {
            expect(res.error).not.toEqual(false);
          })
      });
    })
  })
  describe('/users', () => {
    xdescribe('GET', () => {

    })
    xdescribe('POST', () => {
      
    })
    xdescribe('PUT', () => {
      
    })
    xdescribe('DELETE', () => {
      
    })
  })
})
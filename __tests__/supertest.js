const request = require('supertest');

const server = 'http://localhost:3000';

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
    const testRecipe = { name: 'JESTtest', query: 'blueberry' };
    
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
      });
      it('new recipe is in the body of the response', () => {
        return request(server)
          .post('/recipes')
          .send(testRecipe)
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({name: 'JESTtest'}),
              expect.objectContaining({query: 'blueberry'})
            )
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
    xdescribe('PUT', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .put('/recipes')
          .send(testRecipe)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
    })

    xdescribe('DELETE', () => {
      it('responds with 200 status', () => {
        return request(server)
          .delete('/recipes')
          .send(toBeDeleted)
          .expect(200)
      })
    })
  })

})
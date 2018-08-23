const version = '1';
const apPrefix = `/api/v${version}/ap`;
const clientPrefix = `/api/v${version}`;

module.exports.routes = {
  // Webpages
  '/': {
    view: 'pages/homepage'
  },
  
  /**
   * COMMON
   */

  [`GET /api/file`]: { action: 'common/file/get' },
  [`POST /api/file`]: { action: 'common/file/upload' },

  // 'PUT ${prefix}/account/login': {
  //     controller: 'AccountController',
  //     action: 'login',
  //     //swagger path object
  //     swagger: {
  //         methods: ['PUT'],
  //         summary: ' Login',
  //         description: 'Login',
  //         produces: [
  //             'application/json'
  //         ],
  //         tags: [
  //             'Groups'
  //         ],
  //         responses: {
  //             '200': {
  //                 description: 'Login',
  //             }
  //         },
  //         parameters: [
  //             { in: 'body', name: 'body', required: true, schema: { $ref: '#/definitions/login' } }
  //         ]
  //     }
  // },

  // 'GET /swagger.json': { controller: 'SwaggerController', action: 'getSwaggerJson' },
  // Webkooks

  //  Misc

};

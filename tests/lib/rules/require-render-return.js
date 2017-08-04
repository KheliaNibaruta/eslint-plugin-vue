/**
 * @fileoverview Enforces render function to always return value.
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/require-render-return')
const RuleTester = require('eslint').RuleTester

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true }
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('require-render-return', rule, {
  valid: [
    {
      code: `Vue.component('test', {
        render() {
          return {}
        }
      })`,
      parserOptions
    },
    {
      code: `Vue.component('test', {
        foo() {
          return {}
        }
      })`,
      parserOptions
    },
    {
      code: `Vue.component('test', {
        foo: {}
      })`,
      parserOptions
    },
    {
      code: `Vue.component('test', {
        render: foo
      })`,
      parserOptions
    },
    {
      code: `Vue.component('test', {
        render() {
          return <div></div>
        }
      })`,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `export default {
        render() {
          return {}
        }
      }`,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `export default {
        render: () => null
      }`,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `export default {
        render() {
          if (a) {
            return \`<div>a</div>\`
          } else {
            return \`<span>a</span>\`
          }
        }
      }`,
      parserOptions
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `export default {
        render() {
        }
      }`,
      parserOptions,
      errors: [{
        message: 'Expected to return a value in render function.',
        type: 'Identifier',
        line: 2
      }]
    },
    {
      code: `Vue.component('test', {
        render: function () {
          if (a) {
            return
          }
        }
      })`,
      parserOptions,
      errors: [{
        message: 'Expected to return a value in render function.',
        type: 'Identifier',
        line: 2
      }]
    }
  ]
})
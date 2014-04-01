"use strict";

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
  		env : {
  			dev : {
  				NODE_PATH : '.'
  			}
  		},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'node-inspector', 'watch', 'mochaTest'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 8081,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': false,
					'no-preload': false,
					'stack-trace-limit': 50
				}
			}
		},
		nodemon: {
			dev: {
				script: 'index.js',
				options: {
					//DEFAULT DEBUG PORT: 5858
					nodeArgs: ['--debug']
				}
			}
		},
		watch: {
			server: {
				files: ['**/*.js', '!node_modules/**/*.js', '!coverage.html'],
				tasks: ['jshint:with_overrides', 'mochaTest'],
				options: {
					livereload: true
				}
			} 
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'min',
					should: require('should')
				},
				src: ['test/unit/**/*.js']
			},
			coverage: {
				options: {
					reporter: 'html-cov',
					// use the quiet flag to suppress the mocha console output
					quiet: true,
					// specify a destination file to capture the mocha
					// output (the quiet option does not suppress this)
					captureFile: 'coverage.html'
				},
				src: ['test/unit/**/*.js']
			},
			'travis-cov': {
				options: {
					reporter: 'travis-cov'
				},
				src: ['test/unit/**/*.js']
			}
		},
		jshint: { //docs: http://www.jshint.com/docs/options/
			src: ['**/*.js', '!node_modules/**/*.js', '!coverage.html'],
			options: {
				node: true,
				newcap: true,
				strict: true,
				laxcomma: true, 
				noarg: true,
				noempty: true,
				undef: true,
				maxdepth: 2,
				maxlen: 100,
				sub: true
			},
			with_overrides: {
				options: {
					expr: true,
					globals: {
						/* MOCHA */
						describe   : false,
						it         : false,
						before     : false,
						beforeEach : false,
						after      : false,
						afterEach  : false,
						should     : false
					}
				},
				files: {
					src: ['test/**/*.js']
				},
			}
		}
	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('default', ['env:dev', 'concurrent:dev']);

};
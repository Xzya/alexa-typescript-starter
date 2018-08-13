[![Build Status](https://travis-ci.org/Xzya/alexa-typescript-starter.svg?branch=master)](https://travis-ci.org/Xzya/alexa-typescript-starter)
[![codecov](https://codecov.io/gh/Xzya/alexa-typescript-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/Xzya/alexa-typescript-starter)

# Alexa Skill starter project using AWS Lambda and Typescript

This is a simple starter project for Alexa skills using Typescript.

## What is included in the project

- Default request handlers

| Name |
| --- |
| `LaunchRequest` |
| `SessionEndedRequest` |
| `System.ExceptionEncountered` |
| `AMAZON.HelpIntent` |
| `AMAZON.StopIntent` and `AMAZON.CancelIntent` |
| `AMAZON.FallbackIntent` |

- Extra handlers

| Name | Description |
| --- | --- |
| `HelloWorld` | Triggered when the user says "hello", will answer back with "hello". |
| `Debug` | Can be placed at the beginning of the request handlers stack and it will print the `handlerInput`. Useful for debugging. |

- Error handlers

| Name | Description |
| --- | --- |
| `Unexpected` | Catches `ErrorTypes.Unexpected`, which should be thrown when...something unexpected happens. It will tell the user something unexpected happend, and to try again later. |
| `Unknown` | Catches all other errors. It will tell the user it didn't understand the command, and to try saying it again (doesn't end session). |

- Request interceptors

| Name | Description |
| --- | --- |
| `Localization` | Adds `i18next` localization functions to the `RequestAttributes`. |
| `Slots` | Parses the slot values, adds additional useful information to them (e.g. if it was an exact match, or if it's ambiguous etc.), and adds them to the `RequestAttributes`. Check the `GetSlotValues` function inside `lambda/custom/lib/helpers.ts` for more details. |

- Localization strings

Check `lambda/custom/lib/strings.ts`.

- Constants

Including the String keys, so you can have type safety everywhere.

Check `lambda/custom/lib/constants.ts`.

- Helper functions

Many helper functions which should reduce code duplication, and reduce the code needed to do common tasks.

Check `lambda/custom/lib/helpers.ts`.

- Local development

Contains an `http` server using `express`, which you can use with `ngrok` or `servo.net` during local development. Check the [Local development section below](#local-development) for more details.

- Scripts

There are a few scripts inside `package.json` for building and deploying your lambda function using the `ask-cli`. Check the [Developer tasks section below](#developer-tasks) for more details.

- Tests

The project contains automated tests using [jest](https://jestjs.io/). Check the `__tests__` folder.

```bash
$ npm run test
```

If you want to include code coverage, run

```bash
$ npm run test:coverage
```

You can also start `jest` in watch mode:

```bash
$ npm run test:watch
```

- Travis CI and Codecov integrations

## Pre-requisites

- Node.js
- Register for an [AWS Account](https://aws.amazon.com/)
- Register for an [Amazon Developer Account](https://developer.amazon.com/)
- Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

## Installation

- Install the dependencies

```bash
$ npm install
```

## Deployment

**ASK CLI** will create the skill and the Lambda function for you. The Lambda function will be created in `us-east-1 (Northern Virginia)` by default.

1. Navigate to the project's root directory. you should see a file named 'skill.json' there.

2. Deploy the skill and the Lambda function in one step by running the following command:

```bash
$ ask deploy
```

## Local development

In order to develop locally and see your changes reflected instantly, you will need to create an SSH tunnel or expose somehow your local development server. There are several services that allow you to do this, for example [ngrok](https://ngrok.com/) or [serveo.net](https://serveo.net/).

### Using servo.net

This is the easiest to setup

1. You need to have an SSH client installed, then simply run

```bash
$ ssh -R 80:localhost:3980 serveo.net
Forwarding HTTP traffic from [https://YOUR_URL]
Press g to start a GUI session and ctrl-c to quit.
```

2. Once you see the URL, copy it and go to your Skill console.

3. Open the `Endpoint` menu and select `HTTPS`

4. Under `Default Region` paste the previous URL you copied.

5. On the select box choose: `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority`.

6. You are done! Just run `npm start` to start the local server and begin testing the skill.

### Using ngrok.io

1. [Install ngrok](https://ngrok.com/download)

2. Run `ngrok http 3980`

3. Copy the URL and follow the same steps above from 3 to 6.

## Developer tasks

| Command | Description |
| --- | --- |
| `clean` | Deletes the `dist` folder |
| `build` | Builds the lambda function and exports it to the `dist` folder |
| `deploy` | Builds the lambda function and deploys EVERYTHING (skill, model, lambda) |
| `deploy:lambda` | Builds the lambda function and deploys it (just the lambda function) |
| `deploy:local` | Deploys the skill details for the local profile, which will update the HTTPS endpoint |
| `start` | Starts the local `express` server using `nodemon` for local development |

To see the actual commands, check `package.json`.

Also check the [ASK CLI Command Reference](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html) for more details on using the `ASK CLI`.

## Testing

Taken from [the official hello world project](https://github.com/alexa/skill-sample-nodejs-hello-world/blob/master/instructions/7-cli.md#testing).

1. To test, you need to login to Alexa Developer Console, and **enable the "Test" switch on your skill from the "Test" Tab**.

2. Simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 $ ask simulate -l en-US -t "open greeter"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), or through your Amazon Mobile App and say :

	```text
	Alexa, start hello world
	```

## Customization

Taken from [the official hello world project](https://github.com/alexa/skill-sample-nodejs-hello-world/blob/master/instructions/7-cli.md#customization).

1. ```./skill.json```

   Change the skill name, example phrase, icons, testing instructions etc ...

   Remember than many information are locale-specific and must be changed for each locale (e.g. en-US, en-GB, de-DE, etc.)

   See the Skill [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html) for more information.

2. ```./lambda/custom/index.ts```

   Modify messages, and data from the source code to customize the skill.

3. ```./models/*.json```

	Change the model definition to replace the invocation name and the sample phrase for each intent.  Repeat the operation for each locale you are planning to support.

4. Remember to re-deploy your skill and Lambda function for your changes to take effect.

	```bash
	$ npm run deploy
	```

## License

Open sourced under the [MIT license](./LICENSE.md).
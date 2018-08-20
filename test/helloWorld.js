
const alexaTest = require('alexa-skill-test-framework');

// initialize the testing framework
alexaTest.initialize(
	require('../dist/custom/index.js'),
	"amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
	"amzn1.ask.account.VOID");

describe("Hello World Skill", function () {
	// tests the behavior of the skill's LaunchRequest
	describe("LaunchRequest", function () {
		alexaTest.test([
			{
				request: alexaTest.getLaunchRequest(),
				saysLike: "Welcome to the Alexa Skills Kit, you can say hello?", repromptsNothing: false, shouldEndSession: false
			}
		]);
	});

	// tests the behavior of the skill's HelloWorldIntent with like operator
	describe("ErrorCheck", function () {
		alexaTest.setExtraFeature("questionMarkCheck", false);
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("Unknown"),
				says: "Sorry, I can't understand the command. Please say again.", repromptsNothing: false, shouldEndSession: false
			}
		]);
	});
});

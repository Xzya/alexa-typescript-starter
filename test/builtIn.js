
const alexaTest = require('alexa-skill-test-framework');

// initialize the testing framework
alexaTest.initialize(
	require('../dist/custom/index.js'),
	"amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
	"amzn1.ask.account.VOID");

describe("BuiltIn Intents", function () {
	// tests the behavior of the skill's HelpIntent
	describe("HelpIntent", function () {
		alexaTest.setExtraFeature("questionMarkCheck", false);
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("AMAZON.HelpIntent"),
				says: "You can say hello to me?", repromptsNothing: false, shouldEndSession: false
			}
		]);
	});

	// tests the behavior of the skill's HelloWorldIntent with like operator
	describe("HelpIntent like", function () {
		alexaTest.setExtraFeature("questionMarkCheck", false);
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("AMAZON.HelpIntent"),
				saysLike: "hello", repromptsNothing: false, shouldEndSession: false
			}
		]);
	});

	describe("Stop", function () {
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
				says: "Goodbye!", repromptsNothing: true, shouldEndSession: true
			}
		]);
	});

	describe("Cancel", function () {
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("AMAZON.CancelIntent"),
				says: "Goodbye!", repromptsNothing: true, shouldEndSession: true
			}
		]);
	});

	describe("Fallback", function () {
		alexaTest.test([
			{
				request: alexaTest.getIntentRequest("AMAZON.FallbackIntent"),
				says: "Sorry, I can't understand the command. Please say again.", repromptsNothing: false, shouldEndSession: false
			}
		]);
	});
});

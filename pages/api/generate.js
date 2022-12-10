import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
give me a list of 3 meals using only the ingredients below. the meals should come from cook books.

ingredients: 
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `take the meals and generate a recipe for each one based on the ingredients below. the recipe should come from a popular cook book. on the first line include the meal and the macros. then skip a line and list the ingredients. finally, explain the preperation steps in detail.
  
  the ingredients: ${req.body.userInput}

  the meals: ${basePromptOutput.text}

  meal ideas: 
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}\n`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.7,
		// I also increase max_tokens.
    max_tokens: 1500,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
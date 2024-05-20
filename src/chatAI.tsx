import OpenAI from "openai";
import { API_KEY } from "./aiConfig";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

const parameters: ChatCompletionCreateParamsBase = {
  n: 1,
  top_p: 1,
  temperature: 1,
  max_tokens: 1000,
  stream: false,
  model: "gpt-4o",
  messages: [],
};

export class OpenAiChat {
  private readonly openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });
  private readonly messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];

  constructor(system: string) {
    this.messages = [
      {
        role: "system",
        content: system,
      },
    ];
  }

  async say(prompt: string, url: any): Promise<string | null> {
        console.log('start 1');

    const imageUrl = `data:image/jpeg;base64,${url}`;
    console.log('start 2');
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });
    console.log('start 3');

    const answer = response.choices[0].message.content;
    if (answer !== null) {
      console.log('start 4');

      return answer ? JSON.parse(answer) : "zły format";
    } else {
      return "błąd";
    }
  }
}

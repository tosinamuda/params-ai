import LLMKit from ".";

new LLMKit("Who is the president of Nigeria", "Google").runInference().then((value) => console.log(value))

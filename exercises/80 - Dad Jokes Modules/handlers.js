import { fetchJoke } from "./lib.js";
import { jokeHolder, jokeButton } from "./elements.js";
import { randomItemFromArray } from "./utils.js";
import buttonText from "./buttonText.js";

export async function handleClick() {
  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButton.textContent = randomItemFromArray(buttonText, jokeButton.textContent);
}
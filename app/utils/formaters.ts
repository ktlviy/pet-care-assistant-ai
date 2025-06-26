import { PetProfile } from "../types/pet";

export function formatPetMessage(data: PetProfile): string {
  // Check if the image doesn't contain a pet
  if (data.notAnimal) {
    return "**This is not a pet**\n\nThe uploaded image doesn't contain an animal. Please upload a photo of your pet to receive care advice.";
  }

  let msg = `**Pet Info**\n`;
  if (data.petType) msg += `Type: *${data.petType}*\n`;
  if (data.species) msg += `Species: *${data.species}*\n`;
  if (data.color) msg += `Color: *${data.color}*\n`;
  if (data.age) msg += `Age: *${data.age}*\n`;
  if (data.plan && Array.isArray(data.plan) && data.plan.length > 0) {
    msg += `\n**Care Plan:**\n`;
    msg += data.plan.map((step: string) => `- ${step}`).join("\n");
  }
  return msg;
}

export function capitalizeFirstLetter(str?: string) {
  if (!str) return "Unknown species";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderStyledMessage(message: string) {
  const html = message
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/---(.+?)---/g, "<em>$1</em>")
    .replace(/--(.+?)--/g, "<em>$1</em>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  return html;
}

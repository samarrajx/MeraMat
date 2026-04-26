export function shareOnLinkedIn(userProfile, plan) {
  const text = encodeURIComponent(
    `I just built my personal voting plan with MeraMat! 🗳️\n\n` +
    `My readiness score: ${plan.readinessScore}/100 — ${plan.readinessLabel}\n` +
    `State: ${userProfile.state}\n\n` +
    `MeraMat doesn't just explain elections — it tells you exactly what YOU need to do to vote.\n\n` +
    `#MeraMat #Elections #India #Democracy #PromptWars #BuildWithAI`
  )
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?summary=${text}`,
    '_blank'
  )
}

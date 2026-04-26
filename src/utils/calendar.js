export function addToGoogleCalendar(userProfile, plan) {
  const title = encodeURIComponent('Vote on Election Day 🗳️')
  const details = encodeURIComponent(
    `My MeraMat voting plan for ${userProfile.state}\n` +
    `Readiness: ${plan.readinessScore}/100 — ${plan.readinessLabel}\n` +
    `Voter Helpline: 1950\n` +
    `Prepared with MeraMat (meramat-india.run.app)`
  )
  const location = encodeURIComponent(
    `Polling booth, ${userProfile.state}, India`
  )
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`
  window.open(url, '_blank')
}

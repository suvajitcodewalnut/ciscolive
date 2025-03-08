// Configurations
const CONFIG = {
  startDate: "2024-12-12T00:00:00",
  targetDate: "2025-08-10T23:00:00",
  updateInterval: 1000,
  weeksThreshold: 4,
  timeUnits: { day: 864e5, hour: 36e5, minute: 6e4, second: 1e3 },
  timeZone: "America/Los_Angeles",
};

const getDateInTimeZone = (dateInput) => {
  return new Date(
    new Date(dateInput)
      .toLocaleString("en-CA", { timeZone: CONFIG.timeZone, hour12: false })
      .replace(", ", "T")
      .replace(/\.\d+/, "")
  );
};

// DOM Elements
const elements = {
  monthsList: document.getElementById("timelineMonths"),
  progressDots: document.getElementById("timelineProgressDots"),
  progressLine: document.getElementById("timelineProgressLine"),
  daysCount: document.querySelector(".timeline-countdown-days"),
  hoursCount: document.querySelector(".timeline-countdown-hours"),
  minutesCount: document.querySelector(".timeline-countdown-minutes"),
  secondsCount: document.querySelector(".timeline-countdown-seconds"),
  arrow: Object.assign(document.createElement("div"), {
    innerHTML: "&#9660;",
    style: "color:white;position:absolute;top:-18px;font-size:20px;z-index:10;",
  }),
};
document.querySelector(".timeline-progress").appendChild(elements.arrow);

// Timeline calculations
const calculateTimeline = (currentDate) => {
  const startDate = getDateInTimeZone(CONFIG.startDate);
  const targetDate = getDateInTimeZone(CONFIG.targetDate);
  const totalTime = targetDate - startDate;
  const elapsedTime = currentDate - startDate;
  const remainingTime = targetDate - currentDate;
  const overallProgress = (elapsedTime / totalTime) * 100;

  const remainingDays = Math.max(
    0,
    Math.floor(remainingTime / CONFIG.timeUnits.day)
  );
  const remainingHours = Math.max(
    0,
    Math.floor((remainingTime % CONFIG.timeUnits.day) / CONFIG.timeUnits.hour)
  );
  const remainingMinutes = Math.max(
    0,
    Math.floor(
      (remainingTime % CONFIG.timeUnits.hour) / CONFIG.timeUnits.minute
    )
  );
  const remainingSeconds = Math.max(
    0,
    Math.floor(
      (remainingTime % CONFIG.timeUnits.minute) / CONFIG.timeUnits.second
    )
  );
  const remainingWeeks = Math.ceil(remainingDays / 7);
  const shouldShowWeeks = remainingWeeks <= CONFIG.weeksThreshold;
  let progress = overallProgress;
  let effectiveStart = null;

  if (shouldShowWeeks) {
    effectiveStart = new Date(
      targetDate.getTime() - CONFIG.weeksThreshold * 7 * CONFIG.timeUnits.day
    );
    const effectiveTotal = targetDate - effectiveStart;
    const effectiveElapsed = currentDate - effectiveStart;
    progress = (effectiveElapsed / effectiveTotal) * 100;
  }

  return {
    progress,
    isComplete: remainingTime <= 0,
    remaining: {
      days: remainingDays,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
      weeks: remainingWeeks,
    },
    shouldShowWeeks,
    targetDate,
    effectiveStart,
  };
};

// Label generator function
const generateLabels = (currentDate) => {
  const timelineInfo = calculateTimeline(currentDate);
  if (timelineInfo.shouldShowWeeks && timelineInfo.effectiveStart) {
    const labels = [];
    const effectiveStart = timelineInfo.effectiveStart;
    const totalWeeks = CONFIG.weeksThreshold;

    for (let i = 0; i < totalWeeks; i++) {
      const labelPosition = (i / totalWeeks) * 100;
      const weeksRemaining = totalWeeks - i;
      labels.push({
        label: `${weeksRemaining} Week${weeksRemaining !== 1 ? "s" : ""}`,
        position: labelPosition,
      });
    }
    // Optionally Remove the first label to match your original behavior.
    return labels.slice(1);
  }

  const startDate = getDateInTimeZone(CONFIG.startDate);
  const targetDate = getDateInTimeZone(CONFIG.targetDate);

  const totalMonths =
    (targetDate.getFullYear() - startDate.getFullYear()) * 12 +
    (targetDate.getMonth() - startDate.getMonth());

  const labels = [];
  for (let i = 0; i <= totalMonths; i++) {
    const labelDate = new Date(startDate);
    labelDate.setMonth(labelDate.getMonth() + i);
    const labelPosition = (i / totalMonths) * 100;
    const labelText = labelDate.toLocaleString("default", { month: "short" });
    labels.push({ label: labelText, position: Math.min(100, labelPosition) });
  }

  // Optionally Remove the first label to match your original behavior.
  return labels.slice(1);
};

// To Update the Timeline UI
const updateUI = () => {
  const update = () => {
    const currentDate = getDateInTimeZone(new Date());
    const timelineInfo = calculateTimeline(currentDate);
    const { progress, remaining, isComplete } = timelineInfo;
    const labels = generateLabels(currentDate);

    elements.progressDots.style.width = `${progress}%`;
    elements.progressLine.style.left = `${progress}%`;
    elements.progressLine.style.width = `${100 - progress}%`;
    elements.arrow.style.left = `${progress}%`;
    elements.arrow.style.transform = "translateX(-50%)";

    // Update countdown numbers.
    ["days", "hours", "minutes", "seconds"].forEach((unit) => {
      elements[`${unit}Count`].textContent = String(remaining[unit]).padStart(
        2,
        "0"
      );
    });

    // Update timeline labels
    elements.monthsList.innerHTML = labels
      .map(
        ({ label, position }) =>
          `<span style="left: ${
            position - 1
          }%; transform: translateX(-50%); white-space: nowrap;">${label}</span>`
      )
      .join("");

    if (isComplete) clearInterval(intervalId);
  };

  update();
  const intervalId = setInterval(update, CONFIG.updateInterval);
  return () => clearInterval(intervalId);
};

// Initialize Countdown timeline
updateUI();

const video = document.querySelector(".hero-section__video");
if (video) {
  // Add preloading hint first
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.href = video.src;
  document.head.appendChild(link);

  // Single consolidated function to handle video play
  const playVideo = () => {
    if (video.paused && video.readyState >= 3) {
      // Only play when we have enough data
      video.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    }
  };

  // Listen for the most reliable event for playback
  video.addEventListener("canplaythrough", playVideo, { once: true });

  // Fallback for browsers that might not trigger canplaythrough
  video.addEventListener(
    "loadeddata",
    () => {
      setTimeout(playVideo, 100); // Small delay to allow for more buffering
    },
    { once: true }
  );
}

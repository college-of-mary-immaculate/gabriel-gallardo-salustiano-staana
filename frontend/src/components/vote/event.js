// components/vote/event.js

// Different candidates for each position
export const candidatesByPosition = {
  president: [
    {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif",
      rank_badge: "1",
      total_votes: "3,000",
    },
    {
      name: "Jane Smith",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_2_nj4cvn.png",
      rank_badge: "2",
      total_votes: "3,000",
    },
    {
      name: "Bob Johnson",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_5_ggem1u.png",
      rank_badge: "3",
      total_votes: "3,000",
    },
  ],
  "vice-president": [
    {
      name: "Alice Williams",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_1_ivzpoy.png",
      rank_badge: "2",
      total_votes: "3,000",
    },
    {
      name: "Charlie Brown",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_3_sn1toa.png",
      rank_badge: "3",
      total_votes: "3,000",
    },
    {
      name: "Diana Prince",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_rhruv8.png",
      rank_badge: "1",
      total_votes: "3,000",
    },
  ],
  senator: [
    {
      name: "Eve Davis",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_4_oye3yj.png",
      rank_badge: "1",
      total_votes: "3,000",
    },
    {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif",
      rank_badge: "3",
      total_votes: "3,000",
    },
    {
      name: "Jane Smith",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_2_nj4cvn.png",
      rank_badge: "2",
      total_votes: "3,000",
    },
  ],
  mayor: [
    {
      name: "Bob Johnson",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_5_ggem1u.png",
      rank_badge: "2",
      total_votes: "3,000",
    },
    {
      name: "Alice Williams",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_1_ivzpoy.png",
      rank_badge: "1",
      total_votes: "3,000",
    },
    {
      name: "Charlie Brown",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_3_sn1toa.png",
      rank_badge: "3",
      total_votes: "3,000",
    },
  ],
  "vice-mayor": [
    {
      name: "Diana Prince",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_rhruv8.png",
      rank_badge: "1",
      total_votes: "3,000",
    },
    {
      name: "Eve Davis",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_4_oye3yj.png",
      rank_badge: "2",
      total_votes: "3,000",
    },
    {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif",
      rank_badge: "3",
      total_votes: "3,000",
    },
  ],
};

// Position titles and descriptions
export const positionInfo = {
  president: {
    title: "Vote for President",
    subtitle: "Select your preferred presidential candidate",
  },
  "vice-president": {
    title: "Vote for Vice President",
    subtitle: "Select your preferred vice presidential candidate",
  },
  senator: {
    title: "Vote for Senator",
    subtitle: "Select your preferred senatorial candidate",
  },
  mayor: {
    title: "Vote for Mayor",
    subtitle: "Select your preferred mayoral candidate",
  },
  "vice-mayor": {
    title: "Vote for Vice Mayor",
    subtitle: "Select your preferred vice mayoral candidate",
  },
};

// Store reference to the render function
let renderMainContent = null;

export function setRenderFunction(renderFn) {
  renderMainContent = renderFn;
}

// Attach sidebar navigation events
export function attachSidebarEvents() {
  const sidebarLinks = document.querySelectorAll("a[href^='#']");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      sidebarLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      link.classList.add("active");

      // Get the position (e.g., "president" from "#president")
      const position = link.getAttribute("href").replace("#", "");

      // Re-render main content with new position
      if (renderMainContent) {
        renderMainContent(position);
      }
    });
  });
}

// Attach vote button events
export function attachVoteEvents() {
  const cancelButton = document.querySelector("[data-action='cancel']");
  const voteButton = document.querySelector("[data-action='vote']");

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to cancel your vote?")) {
        console.log("Vote cancelled");
        // Add your cancel logic here
      }
    });
  }

  if (voteButton) {
    voteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to submit your vote?")) {
        console.log("Vote submitted");
        // Add your vote submission logic here
      }
    });
  }
}

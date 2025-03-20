import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Landing from "./Landing";

const mockResponse = [
  {
    id: 1,
    title: "Portugal",
    description:
      "Embark on a journey through Portugal, where the charming streets of Lisbon captivate you, the golden beaches of the Algarve await, and Portuguese cuisine delights with authentic flavors. Explore castles in Sintra and create unforgettable memories in this destination full of history and beauty. Portugal invites you to experience something truly unique!",
    photo_url:
      "https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg",
    introduction:
      "Portugal is a country located in southwestern Europe on the Iberian Peninsula. It is the westernmost country of mainland Europe, and is bordered by the Atlantic Ocean to the west and south and by Spain to the north and east. The Atlantic archipelagos of the Azores and Madeira are also part of Portugal.",
    status: "todo",
    itinerary: [
      {
        day: 1,
        location: "Lisbon",
        description:
          "Explore the Alfama neighborhood and visit São Jorge Castle.",
      },
      {
        day: 2,
        location: "Lisbon",
        description:
          "Visit the Jerónimos Monastery and the Monument to the Discoveries.",
      },
    ],
  },
  {
    id: 2,
    title: "Hawaii",
    description:
      "Embark on a tropical escapade to Hawaii, where the lush landscapes of Oahu, the volcanic wonders of Maui, and the serene beaches of Kauai beckon. Immerse yourself in the Aloha spirit, savor the flavors of traditional Hawaiian cuisine, and witness the breathtaking beauty of the Pacific archipelago. Hawaii invites you to experience the perfect blend of paradise and adventure.",
    photo_url:
      "https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2021/12/1140-oahu-hero.jpg",
    introduction:
      "Hawaii is a U.S. state located in the central Pacific Ocean. It is an archipelago of 137 islands, with the eight main islands being the most prominent. As the most remote state, Hawaii is surrounded by the Pacific Ocean in all directions.",
    status: "todo",
    itinerary: [
      {
        day: 1,
        location: "Honolulu, Oahu",
        description:
          "Explore the vibrant city of Honolulu, visit Waikiki Beach, and hike to the summit of Diamond Head for panoramic views.",
      },
      {
        day: 2,
        location: "North Shore, Oahu",
        description:
          "Discover the legendary North Shore, known for its big waves, explore Haleiwa town, and relax on the scenic beaches.",
      },
    ],
  },
  {
    id: 6,
    title: "South Korea",
    description:
      "Explore the enchanting landscapes and rich cultural heritage of South Korea. From the bustling streets of Seoul to the historic sites of Gyeongju, and the serene beauty of Jeju Island, South Korea invites you on an immersive journey through its vibrant cities and picturesque landscapes.",
    photo_url:
      "https://lp-cms-production.imgix.net/2019-06/09a64fea2933f6da77ab07d671d1f678-south-korea.jpg",
    introduction:
      "South Korea is a country in East Asia, located on the southern half of the Korean Peninsula. It is bordered by North Korea to the north and surrounded by the Yellow Sea to the west and the Sea of Japan (East Sea) to the east",
    status: "done",
    itinerary: [
      {
        day: 1,
        location: "Seoul",
        description:
          "Discover the modern charm of Seoul with visits to Gyeongbokgung Palace and the bustling Dongdaemun Design Plaza.",
      },
      {
        day: 2,
        location: "Seoul",
        description:
          "Explore the vibrant neighborhoods of Insadong and Myeongdong, known for their traditional markets and trendy shops.",
      },
      {
        day: 3,
        location: "Gyeongju",
        description:
          "Immerse yourself in the ancient history of Gyeongju by visiting Bulguksa Temple and the historic Seokguram Grotto.",
      },
      {
        day: 4,
        location: "Gyeongju",
        description:
          "Stroll through the picturesque streets of the Yangdong Folk Village and visit the beautiful Anapji Pond.",
      },
    ],
  },
];

describe("Landing", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      // @ts-ignore: Unreachable code error
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockResponse) });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders", async () => {
    await act(async () => render(<Landing />));
    const landingPage = screen.getByLabelText("landing-page");
    expect(landingPage).toBeVisible();
  });

  it("searches by text", async () => {
    await act(async () => render(<Landing />));

    const portugalCard = await screen.findAllByText(/portugal/i);
    expect(portugalCard[0]).toBeVisible();

    const searchBar = screen.getByPlaceholderText(/Search trips/i);
    fireEvent.change(searchBar, { target: { value: "Hawaii" } });
    const searchButton = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(searchButton);

    expect(screen.queryByText(/portugal/i)).not.toBeInTheDocument();
  });

  it("filters by state", async () => {
    await act(async () => render(<Landing />));

    const portugalCard = await screen.findAllByText(/portugal/i);
    expect(portugalCard[0]).toBeVisible();

    const completedButton = screen.getByRole("button", { name: /completed/i });
    fireEvent.click(completedButton);

    expect(screen.queryByText(/portugal/i)).not.toBeInTheDocument();

    const upcomingButton = screen.getByRole("button", { name: /upcoming/i });
    fireEvent.click(upcomingButton);

    expect(screen.queryByText(/south korea/i)).not.toBeInTheDocument();

    const allButton = screen.getByRole("button", { name: /all/i });
    fireEvent.click(allButton);

    expect(screen.queryAllByText(/south korea/i)[0]).toBeVisible();
    expect(screen.queryAllByText(/portugal/i)[0]).toBeVisible();
  });

  it("deleted a card", async () => {
    await act(async () => render(<Landing />));

    const portugalCard = await screen.findAllByText(/portugal/i);
    expect(portugalCard[0]).toBeVisible();

    const deleteButton = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton[0]);

    expect(screen.queryByText(/portugal/i)).not.toBeInTheDocument();
  });

  it("opens creation modal", async () => {
    await act(async () => render(<Landing />));

    const createTripButton = screen.getByRole("button", {
      name: /create new trip/i,
    });
    fireEvent.click(createTripButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();

    const iconButtons = screen.getAllByRole("button", { name: /icon-button/i });
    fireEvent.click(iconButtons[0]);
    expect(modal).not.toBeInTheDocument();
  });

  it("creates new cards", async () => {
    await act(async () => render(<Landing />));
    expect(await screen.findAllByLabelText("card")).toHaveLength(3);

    const createTripButton = screen.getByRole("button", {
      name: /create new trip/i,
    });
    fireEvent.click(createTripButton);

    const saveTripButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveTripButton);
    expect(await screen.findAllByLabelText("card")).toHaveLength(4);
  });

  it("opens edit modal", async () => {
    await act(async () => render(<Landing />));

    const editButton = await screen.findAllByRole("button", { name: /edit/i });
    fireEvent.click(editButton[0]);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();

    const iconButtons = screen.getAllByRole("button", { name: /icon-button/i });
    fireEvent.click(iconButtons[0]);
    expect(modal).not.toBeInTheDocument();
  });

  it("edits existing card", async () => {
    await act(async () => render(<Landing />));
    expect(await screen.queryAllByText(/mexico/i)).toHaveLength(0);

    const editButton = await screen.findAllByRole("button", { name: /edit/i });
    fireEvent.click(editButton[0]);

    const nameTextfield = screen.getByPlaceholderText(/italy/i);
    fireEvent.change(nameTextfield, {
      target: { value: "mexico" },
    });

    const saveTripButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveTripButton);
    expect(await screen.queryAllByText(/mexico/i)).toHaveLength(1);
  });

  it("opens details modal", async () => {
    await act(async () => render(<Landing />));

    const detailsButton = await screen.findAllByRole("button", {
      name: /see trip details/i,
    });
    fireEvent.click(detailsButton[0]);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();

    const closeButton = screen.getByRole("button", { name: /icon-button/i });
    fireEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  it("marks existing trip as completed", async () => {
    await act(async () => render(<Landing />));

    const completedButton = screen.getByRole("button", { name: /completed/i });
    fireEvent.click(completedButton);

    expect(screen.queryByText(/portugal/i)).not.toBeInTheDocument();

    const upcomingButton = screen.getByRole("button", { name: /upcoming/i });
    fireEvent.click(upcomingButton);

    const detailsButton = await screen.findAllByRole("button", {
      name: /see trip details/i,
    });
    fireEvent.click(detailsButton[0]);

    const markAsCompletedButton = screen.getByRole("button", {
      name: /Mark as completed/i,
    });
    fireEvent.click(markAsCompletedButton);
    fireEvent.click(completedButton);

    expect(await screen.queryAllByText(/portugal/i)[0]).toBeVisible();
  });
});

type UnicycleSize = {
  id: number;
  name: string;
  description: string;
  cutDownSeatpost: string;
  minimumLegLength: string;
  maximumLegLength: string;
};

export const useUnicycleSizes = (sizesString: string): UnicycleSize[] => {
  const sizes: UnicycleSize[] = [
    {
      id: 1,
      name: '12"',
      description:
        "Designed for children up to 5 years old. Ideal for smooth, indoor surfaces.",
      cutDownSeatpost: '18.5" (47cm)',
      minimumLegLength: '19.5" (50cm)',
      maximumLegLength: '24" (61.5cm)',
    },
    {
      id: 2,
      name: '16"',
      description:
        "Best for kids aged 5-8, suitable for indoor or smooth outdoor surfaces.",
      cutDownSeatpost: '20" (51cm)',
      minimumLegLength: '23.5" (60cm)',
      maximumLegLength: '29" (74cm)',
    },
    {
      id: 3,
      name: '20"',
      description:
        "Popular for tricks and indoor use; great for learning but not for distance.",
      cutDownSeatpost: '24" (61cm)',
      minimumLegLength: '28" (71cm)',
      maximumLegLength: '33" (84cm)',
    },
    {
      id: 4,
      name: '24"',
      description:
        "Suitable for adults learning or freestyle riding; can handle rougher terrain.",
      cutDownSeatpost: '27" (69cm)',
      minimumLegLength: '31" (79cm)',
      maximumLegLength: '36.6" (93cm)',
    },
    {
      id: 5,
      name: '26"',
      description:
        "Versatile for both pavement and off-road; good for taller adults.",
      cutDownSeatpost: '29" (74cm)',
      minimumLegLength: '32" (81cm)',
      maximumLegLength: '36" (92cm)',
    },
    {
      id: 6,
      name: '27.5"',
      description: "Ideal for mountain riding with agility and tire variety.",
      cutDownSeatpost: '29" (74cm)',
      minimumLegLength: '33" (84cm)',
      maximumLegLength: '38" (97cm)',
    },
    {
      id: 7,
      name: '29"',
      description: "Great for commuting and light mountain trails.",
      cutDownSeatpost: '30" (76cm)',
      minimumLegLength: '34" (86cm)',
      maximumLegLength: '39" (100cm)',
    },
    {
      id: 8,
      name: '32"',
      description:
        "Fast and agile, suitable for commuting and light mountain riding.",
      cutDownSeatpost: '30" (76cm)',
      minimumLegLength: '33.5" (86cm)',
      maximumLegLength: '38" (97cm)',
    },
    {
      id: 9,
      name: '36"',
      description:
        "The fastest option for commuting; requires more control but offers high speed.",
      cutDownSeatpost: '30" (81cm)',
      minimumLegLength: '29.5" (75cm)',
      maximumLegLength: '40.5" (103cm)',
    },
  ];

  // Split the input string into an array of size strings
  const sizeArray = sizesString.split(",").map((size) => size.trim());

  // Find and return all matching unicycle sizes
  return sizes.filter((unicycle) => sizeArray.includes(unicycle.name));
};

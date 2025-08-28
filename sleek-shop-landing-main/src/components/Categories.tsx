const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Sustainably Sourced",
      description: "Our supplies are sustainable and eco-friendly",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.8 22 12 17l5.2 5"/><path d="M12 17V3"/><path d="M9 5.8 12 3l3 2.8"/></svg>`,
    },
    {
      id: 2,
      name: "Chemical-free",
      description: "Equipment that is chemical-free and family-friendly",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
    },
    {
      id: 3,
      name: "Feel Good",
      description: "Enhancing your baking experience",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><path d="M8 7v10c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V7"/><path d="M7 7h10"/><path d="M7 13h10"/></svg>`,
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Shop Sourdough Supplies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="text-center">
              <div className="feature-icon mb-6" dangerouslySetInnerHTML={{ __html: category.icon }}></div>
              <h3 className="text-lg font-medium mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-medium mb-4">
            Sustainably-sourced, affordable kitchen solutions
          </h3>
          <p className="text-muted-foreground mb-8">
            Bringing together classic kitchen equipment to improve the way that we eat and drink every day.
          </p>
          <button className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-sm uppercase tracking-wider transition-colors">
            Show more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;

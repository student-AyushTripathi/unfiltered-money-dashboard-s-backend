

import SectionOrder from '../models/SectionOrder.js';
import Category from '../models/category.model.js'; // Import the Category model

// Default sections (mirrored from frontend)
const defaultSections = {
  home: [
    { id: "hero", title: "Hero Section", order: 0 },
    { id: "stock-market-analysis", title: "Stock Market Analysis", order: 1 },
    { id: "credit-cards", title: "Explore Top Credit Cards", order: 2 },
    { id: "financial-tools", title: "Financial Tools & Calculators", order: 3 },
    { id: "gold-trends", title: "Gold Trends", order: 4 },
    { id: "insurance-options", title: "Explore Insurance Options", order: 5 },
    { id: "personal-finance-blogs", title: "Personal Finance", order: 6 },
    { id: "financial-news", title: "Latest Financial News", order: 7 },
  ],
  investment: [
    { id: "investment-hero", title: "Investment Hero", order: 0 },
    { id: "investment-overview", title: "Investment Overview", order: 1 },
    { id: "investment-options", title: "Explore Investment Options", order: 2 },
    { id: "goal-based-investment", title: "Goal Based Investment", order: 3 },
    { id: "investment-faqs", title: "Investment FAQs", order: 4 },
    { id: "investment-blogs", title: "Investment Blogs", order: 5 },
  ],
  insurance: [
    { id: "insurance-hero", title: "Insurance Hero", order: 0 },
    { id: "explore-insurance", title: "Explore Insurance Options", order: 1 },
    { id: "featured-insurance", title: "Featured Insurance Plans", order: 2 },
    { id: "insurance-calculator", title: "Insurance Calculator", order: 3 },
    { id: "insurance-benefits", title: "Benefits of Insurance", order: 4 },
    { id: "insurance-form", title: "Insurance Contact Form", order: 5 },
    { id: "insurance-blogs", title: "Insurance Blogs", order: 6 },
  ],
  personal_loan: [
    { id: "personal-loan-hero", title: "Personal Loan Hero", order: 0 },
    { id: "personal-loan-calculator", title: "Personal Loan Calculator", order: 1 },
    { id: "personal-loan-eligibility", title: "Loan Application Requirements", order: 2 },
    { id: "top-lenders", title: "Top Lenders", order: 3 },
    { id: "compare-by-category", title: "Compare by Category", order: 4 },
    { id: "application-process", title: "Application Process", order: 5 },
    { id: "personalloan-blogs", title: "Personal Loan Blogs", order: 6 },
  ],
  credit_card: [
    { id: "credit-card-hero", title: "Credit Card Hero", order: 0 },
    { id: "credit-card-products", title: "Explore Our Products", order: 1 },
    { id: "credit-card-eligibility", title: "Credit Card Eligibility", order: 2 },
    { id: "credit-card-comparison", title: "Explore Top Credit Cards", order: 3 },
    { id: "credit-card-finder", title: "Find Your Perfect Credit Card", order: 4 },
    { id: "creditcard-blogs", title: "Credit Card Blogs", order: 5 },
  ],
  nps: [
    { id: "nps-hero", title: "NPS Hero", order: 0 },
    { id: "nps-comparison", title: "Quick Comparison: NPS vs PPF vs EPF", order: 1 },
    { id: "nps-calculators", title: "Investment Calculators", order: 2 },
    { id: "nps-overview", title: "National Pension System (NPS)", order: 3 },
    { id: "ppf-overview", title: "Public Provident Fund (PPF)", order: 4 },
    { id: "epf-overview", title: "Employees' Provident Fund (EPF)", order: 5 },
    { id: "nps-recommendations", title: "Investment Recommendations by Life Stage", order: 6 },
  ],
  fixed_deposit: [
    { id: "fixed-deposit-hero", title: "Fixed Deposit Hero", order: 0 },
    { id: "fd-calculator", title: "FD Calculator", order: 1 },
    { id: "fd-comparison", title: "Top Banks for Fixed Deposits", order: 2 },
    { id: "fd-eligibility-documents", title: "FD Application Requirements", order: 3 },
    { id: "fd-application-process", title: "Application Process", order: 4 },
    { id: "fd-benefits", title: "Benefits of Fixed Deposits", order: 5 },
    { id: "fd-blogs", title: "Fixed Deposit Blogs", order: 6 },
  ],
  crypto: [
    { id: "crypto-hero", title: "Crypto Hero", order: 0 },
    { id: "crypto-market-overview", title: "Cryptocurrency Market Overview", order: 1 },
    { id: "top-cryptocurrencies", title: "Top Cryptocurrencies", order: 2 },
    { id: "crypto-benefits-risks", title: "Benefits & Risks of Crypto Investment", order: 3 },
    { id: "crypto-how-to-invest", title: "How to Start Investing in Crypto", order: 4 },
    { id: "crypto-blogs", title: "Crypto Blogs", order: 5 },
    { id: "crypto-cta-footer", title: "Crypto CTA Footer", order: 6 },
  ],
  stocks: [
    { id: "stocks-overview", title: "Stock List and Watchlist", order: 0 },
    { id: "sector-performance", title: "Sector Performance", order: 1 },
    { id: "top-movers", title: "Top Movers", order: 2 },
    { id: "expert-picks-ipo", title: "Expert Picks & IPO Tracker", order: 3 },
    { id: "stocks-blogs", title: "Stocks Blogs", order: 4 },
  ],
  mutual_funds: [
    { id: "mutual-funds-hero", title: "Mutual Funds Hero", order: 0 },
    { id: "find-mutual-funds", title: "Find the Right Mutual Fund", order: 1 },
    { id: "featured-mutual-funds", title: "Featured Mutual Funds", order: 2 },
    { id: "mf-comparison", title: "Compare Mutual Funds", order: 3 },
    { id: "top-performing-funds", title: "Top Performing Funds", order: 4 },
    { id: "mutualfunds-blogs", title: "Mutual Funds Blogs", order: 5 },
  ],
  blogs: [],
  blog_detail: [
    { id: "blog-content", title: "Blog Content", order: 0 },
    { id: "related-blogs", title: "Related Blogs", order: 1 },
  ],
  gold_investment: [
    { id: "gold-hero", title: "Gold Hero", order: 0 },
    { id: "gold-trends", title: "Live Price Tracker", order: 1 },
    { id: "gold-investment-overview", title: "Gold Investment Overview", order: 2 },
    { id: "gold-compare-options", title: "Compare Investment Options", order: 3 },
    { id: "gold-blogs", title: "Gold & Silver Blogs", order: 4 },
  ],
};

// GET /api/v1/section-orders/:pageId
export const getSectionOrder = async (req, res) => {
  try {
    const { pageId } = req.params;
    let sectionOrder = await SectionOrder.findOne({ pageId });

    // if (pageId === "blogs") {
    //   try {
    //     // Fetch all categories directly from the Category model
    //     const categories = await Category.find().lean(); // .lean() for plain JS objects
    //     if (categories.length === 0) {
    //       throw new Error("No categories found in database");
    //     }

    //     console.log("Categories fetched for blogs page:", categories.map(cat => cat.name)); // Debug log

    //     // Always update sections to reflect current categories
    //     if (!sectionOrder) {
    //       sectionOrder = new SectionOrder({
    //         pageId,
    //         sections: categories.map((cat, index) => ({
    //           id: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-") + "-blogs",
    //           title: `${cat.name} Blogs`,
    //           order: index,
    //         })),
    //       });
    //     } else {
    //       // Sync sections with current categories
    //       const currentIds = sectionOrder.sections.map(s => s.id);
    //       let updatedSections = categories.map((cat, index) => ({
    //         id: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-") + "-blogs",
    //         title: `${cat.name} Blogs`,
    //         order: index,
    //       }));

    //       // Remove sections for categories no longer present
    //       sectionOrder.sections = sectionOrder.sections.filter(section =>
    //         categories.some(cat => 
    //           (cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-") + "-blogs") === section.id
    //         )
    //       );

    //       // Add or update existing sections
    //       updatedSections.forEach((section, index) => {
    //         const existingSection = sectionOrder.sections.find(s => s.id === section.id);
    //         if (existingSection) {
    //           existingSection.order = index;
    //         } else {
    //           sectionOrder.sections.push({ ...section, order: index });
    //         }
    //       });

    //       // Sort and deduplicate if needed
    //       sectionOrder.sections = [...new Map(sectionOrder.sections.map(s => [s.id, s])).values()];
    //     }

    //     await sectionOrder.save();
    //   } catch (categoryError) {
    //     console.error("Error fetching categories:", categoryError.message);
    //     return res.status(500).json({ message: "Failed to fetch categories", sections: [] });
    //   }
    // }
    if (pageId === "blogs") {
  try {
    const categories = await Category.find().lean();

    if (categories.length === 0) {
      throw new Error("No categories found in database");
    }

    if (!sectionOrder) {
      // पहली बार create → default order same as categories index
      sectionOrder = new SectionOrder({
        pageId,
        sections: categories.map((cat, index) => ({
          id: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-") + "-blogs",
          title: `${cat.name} Blogs`,
          order: index,
        })),
      });
    } else {
      // पहले से sections हैं → सिर्फ sync करो
      const existingSections = new Map(sectionOrder.sections.map(s => [s.id, s]));

      const updatedSections = categories.map((cat, index) => {
        const id = cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-") + "-blogs";
        if (existingSections.has(id)) {
          // पुराना order preserve करो
          return existingSections.get(id);
        } else {
          // नया category → end में डाल दो
          return {
            id,
            title: `${cat.name} Blogs`,
            order: sectionOrder.sections.length + index,
          };
        }
      });

      sectionOrder.sections = updatedSections;
    }

    await sectionOrder.save();
  } catch (categoryError) {
    console.error("Error fetching categories:", categoryError.message);
    return res.status(500).json({ message: "Failed to fetch categories", sections: [] });
  }
}
 else {
      // Non-blogs pages → fallback to defaultSections
      if (!sectionOrder) {
        if (!defaultSections[pageId.replace("-", "_")]) {
          return res.status(404).json({ message: "Invalid page ID", sections: [] });
        }
        sectionOrder = new SectionOrder({
          pageId,
          sections: defaultSections[pageId.replace("-", "_")],
        });
      }
    }

    // Always sort by order
    sectionOrder.sections.sort((a, b) => a.order - b.order);
    await sectionOrder.save();

    res.status(200).json({ sections: sectionOrder.sections });
  } catch (error) {
    console.error(`Error fetching section order for pageId ${req.params.pageId}:`, error);
    res.status(500).json({ message: "Server error", sections: [] });
  }
};

// PUT /api/v1/section-orders/:pageId
export const updateSectionOrder = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { sections } = req.body;

    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ message: "Invalid sections data" });
    }

    let sectionOrder = await SectionOrder.findOne({ pageId });
    if (!sectionOrder) {
      // If no section order exists, create one
      sectionOrder = new SectionOrder({ pageId, sections });
    } else {
      // Update existing section order
      sectionOrder.sections = sections;
    }

    await sectionOrder.save();
    res.status(200).json({ message: "Section order updated", sections: sectionOrder.sections });
  } catch (error) {
    console.error(`Error updating section order for pageId ${req.params.pageId}:`, error);
    res.status(500).json({ message: "Server error" });
  }
};




export const categoriesPrompt =
  "'ubrania', 'akcesoria', 'słodycze', 'żywność', 'elektronika', 'książki', 'kosmetyki', 'meble', 'narzędzia', 'biżuteria, 'paliwo', 'usługi', 'zabawki', 'leki', 'obuwie'";

export const categories = [
  "ubrania",
  "akcesoria",
  "słodycze",
  "żywność",
  "elektronika",
  "książki",
  "kosmetyki",
  "meble",
  "narzędzia",
  "biżuteria",
  "paliwo",
  "usługi",
  "zabawki",
  "leki",
  "obuwie",
];

export const template = `
"receipt_details": {
  "seller_details": {
    "name": "",
    "address": "",
  },
  "purchase_items": [{
    "item_name": "item_name1",
    "quantity": ?,
    "unit": "szt or kg" (if quantity is decimal number its probably weight so return kg if not its probably pieces so return szt.),
    "unit_price": (price for one item or one kilogram)
    "price_before_discount": (always return and read from the receipt, do not calculate. Its very important)
    "discount_value": (leave 0 when no discout),
    "price_after_discount": (leave 0 when no discout),
    "category": ${categoriesPrompt},
  },
  {
    ...next object
    "item_name": "item_name2",
  },
],
  "total": 0.00,
}
`;
export const systemPrompt = "Weryfikujesz paragony. ";

export const prompt =
  "Zawsze zwracaj uwagę czy produkt jest objęty promocją, jeśli nie to jako cene zakupu uzupełnij price_before_discount. purchase_items ma zawsze być tablicą z obiektami gdzie liczba obiektów ma zawsze być równa elementom na paragonie. Całość wpisz w szablon:" +
  template +
  "wynik zwróć w formacie JSON";

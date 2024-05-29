export const categoriesPrompt =
"'ubrania', 'akcesoria', 'słodycze', 'żywność', 'elektronika', 'książki', 'kosmetyki', 'meble', 'narzędzia', 'biżuteria, 'paliwo', 'usługi', 'zabawki', 'leki', 'obuwie'";

export const categories =
['ubrania', 'akcesoria', 'słodycze', 'żywność', 'elektronika', 'książki', 'kosmetyki', 'meble', 'narzędzia', 'biżuteria', 'paliwo', 'usługi', 'zabawki', 'leki', 'obuwie'];

export const template = `
"receipt_details": {
  "seller_details": {
    "name": "",
    "address": "",
  },
  "purchase_items": [ {
    "description": "item_name1",
    "price_before_discount": 0
    "discount_value": (leave 0 when no discout),
    "price_after_discount": (leave 0 when no discout),
    "quantity": ?,
    "unit": "szt or kg" (if quantity is decimal number its probably weight so return kg if not its probably pieces so return szt.),
    "category": ?,
  },
  {
    "description": "item_name2",
    ...others
  },
],
  "total": 0.00,
}
`;
export const systemPrompt ="Weryfikujesz paragony i wypisujesz wszystkie pozycje";

export const prompt =
"Zawsze zwracaj uwagę czy produkt jest objęty promocją, jeśli nie to jako cene zakupu uzupełnij price_before_discount a resztę opisz wedle szablonu kategorią ma być jedna z:" +
categoriesPrompt +
"Pamiętaj że liczba elementów w purchase_items ma być równa elementom na paragonie" +
template +
"zawsze zwracaj wynik w formacie JSON";
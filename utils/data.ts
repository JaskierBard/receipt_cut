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
    "price": 0.00,
    "price": 0.00,

    "quantity": ?,
    "category": ?,
  },
  {
    "description": "item_name2",
    "price": ?,
    "quantity": ?,
    "category": ?,
  },
],
  "total": 0.00,
}
`;
export const systemPrompt ="Weryfikujesz paragony i wypisujesz wszystkie pozycjie";

export const prompt =
"opisz wedle szablonu kategorią ma być jedna z:" +
categoriesPrompt +
"Pamiętaj że liczba elementów w purchase_items ma być równa elementom na paragonie" +
template +
"Jeśli podana jest waga produktu a nie jedo ilość to wpisz 1. zawsze zwracaj wynik w formacie JSON";
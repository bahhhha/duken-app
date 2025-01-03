import { NextResponse } from "next/server";
import { google } from "googleapis";
import { CartItem } from "@/features/product/add-to-cart/model";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, address, message, cart } =
      await request.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    const cartData = cart
      .map((item: CartItem) => {
        const { name } = item.product;
        return `${name} (${item.quantity} шт.)`;
      })
      .join("\n");

    const addressString = [
      address.street ? `ул. ${address.street}` : "",
      address.house ? `д. ${address.house}` : "",
      address.apartment ? `кв. ${address.apartment}` : "",
      address.floor ? `этаж ${address.floor}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    const rowData = [
      new Date().toLocaleString("ru-RU"),
      firstName,
      lastName,
      email,
      phone,
      addressString,
      message,
      cartData,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:I",
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData],
      },
    });

    const positionsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Positions!A5:M",
    });

    const positionsValues = positionsResponse.data.values || [];
    const updates = [];

    for (let i = 0; i < positionsValues.length; i++) {
      const productId = positionsValues[i][0];
      const cartItem = cart.find(
        (item: CartItem) => item.product.id === productId
      );

      if (cartItem) {
        const currentQuantity = Number(positionsValues[i][12]) || 0;
        const newQuantity = Math.max(0, currentQuantity - cartItem.quantity);

        updates.push({
          range: `Positions!M${i + 5}`,
          values: [[newQuantity]],
        });
      }
    }

    if (updates.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: "RAW",
          data: updates,
        },
      });
    }

    return NextResponse.json(
      { message: "Данные успешно отправлены" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при добавлении данных в Google Sheets:", error);
    return NextResponse.json(
      { error: "Не удалось отправить данные" },
      { status: 500 }
    );
  }
}

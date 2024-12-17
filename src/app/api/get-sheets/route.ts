import { BusinessDetails } from "@/shared/interfaces/businessDetails";
import { Product } from "@/shared/interfaces/product";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Positions!A1:M100";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values || [];

    const details: BusinessDetails = {
      name: values[1][0] || "",
      description: values[1][1] || "",
      backgroundSrc: values[1][2] || "",
      logoSrc: values[1][3] || "",
    };

    const theme = {
      primaryColor: values[1][5] || "",
      secondaryColor: values[1][6] || "",
      theme: values[1][7] || "",
    };

    const products: Product[] = values.slice(5).map((row) => ({
      id: row[0] || "",
      name: row[1] || "",
      flavor: row[2] || "",
      description: row[3] || "",
      retailPrice: row[4] || "",
      priceFrom150k: row[5] || "",
      priceFrom200k: row[6] || "",
      category: row[7] || "",
      quantity: row[8] || "",
      weight: row[9] || "",
      packagesPerBox: row[10] || "",
      production: row[11] || "",
      photo: row[12] || "",
    }));

    return NextResponse.json({
      details,
      theme,
      products,
    });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Google Sheets" },
      { status: 500 }
    );
  }
}

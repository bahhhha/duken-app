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
    const range = "Positions!A1:L20";

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

    const products: Product[] = values.slice(4).map((row) => {
      const photoUrls = row[7]
        ? row[8]
            .split(",")
            .map((url: string) => url.trim().replace(/\n/g, ""))
            .filter((url: string) => url.length > 0)
        : [];

      return {
        id: row[0] || "",
        name: row[1] || "",
        perPackage: row[2] || "",
        description: row[3] || "",
        content: row[4] || "",
        price: row[5] || "",
        category: row[6] || "",
        photos: photoUrls,
        quantity: row[8] || "",
        hotPrice: row[9] || "",
        recommended: row[10] === "TRUE",
      };
    });
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

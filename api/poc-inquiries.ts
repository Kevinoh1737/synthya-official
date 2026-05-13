import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { db } from "../db/index.js";
import { pocInquiries, insertPocInquirySchema } from "../shared/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const validated = insertPocInquirySchema.parse(req.body);
      const result = await db.insert(pocInquiries).values(validated).returning();
      return res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating POC inquiry:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const inquiries = await db
        .select()
        .from(pocInquiries)
        .orderBy(pocInquiries.createdAt);
      return res.json(inquiries);
    } catch (error) {
      console.error("Error fetching POC inquiries:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}

import { NextResponse } from "next/server";
import { aiAssistantPromptSchema } from "@/lib/validations";
import { aiAssistantService } from "@/lib/backend/ai-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = aiAssistantPromptSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prompt, maxBudget, category } = validated.data;
    const result = await aiAssistantService.processQuery(prompt, maxBudget, category);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "AI Assistant processing error" },
      { status: 500 }
    );
  }
}

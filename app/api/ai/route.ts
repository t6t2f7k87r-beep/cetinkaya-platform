import { NextResponse } from "next/server";

import { buildLocalAiAnswer } from "@/lib/ai";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: string } | null;
  const message = body?.message?.trim();

  if (!message) {
    return NextResponse.json(
      { error: "Mesaj boş olamaz." },
      { status: 400 },
    );
  }

  const localAnswer = buildLocalAiAnswer(message);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      answer: localAnswer,
      mode: "local",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "Sen Çetinkayalar İnşaat Malzemeleri satış programının Türkçe yapı malzemeleri asistanısın. Kısa, uygulanabilir ve satışa yardımcı cevap ver. Verilen yerel ürün önerilerini temel al.",
          },
          {
            role: "user",
            content: JSON.stringify({
              message,
              localAnswer,
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        answer: localAnswer,
        mode: "local",
      });
    }

    const data = (await response.json()) as { output_text?: string };

    return NextResponse.json({
      answer: {
        ...localAnswer,
        summary: data.output_text?.trim() || localAnswer.summary,
      },
      mode: "openai",
    });
  } catch {
    return NextResponse.json({
      answer: localAnswer,
      mode: "local",
    });
  }
}

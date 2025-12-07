from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
import os

api_key = "06d387c775a849ebafd6758afad98dd3"
base_url = "https://apim-pllum-tst-pcn.azure-api.net/vllm/v1"
model_name = "CYFRAGOVPL/pllum-12b-nc-chat-250715"


llm = ChatOpenAI(
    model=model_name,
    openai_api_key="EMPTY",
    openai_api_base=base_url,
    temperature=0.7,
    max_tokens=300,
    default_headers={
        'Ocp-Apim-Subscription-Key': api_key
    }
)

# tekst_do_wyjasnienia = """
# """

#instrukcja = "Nie potwierdzaj wykonania zadania, nie tłumacz co wypisujesz, nie pytaj czy masz zrobić coś jeszcze. Podaj wyłącznie sam wynik polecenia, nic innego poza wynikiem, nie zadawaj żadnych pytań ani nagłówków. Proszę, wytłumacz ten tekst pochodzący z przepisów prawa polskiego używająć prostego języka zrozumiałego dla dziecka, wykonaj podsumowanie podanego poniżej tekstu zawierając jedynie najważniejsze informacje używając maksimum 500 słów: "
#instrukcja = "Uprość tekst, jako wynik podaj wyłącznie zmodyfikowany tekst"

# response = llm.invoke(instrukcja + tekst_do_wyjasnienia)
# tekst = response.content
# lines = tekst.splitlines()
# clean = "\n".join(lines[1:])
# print(clean.strip())


SYSTEM_PROMPT = (
"Jesteś asystentem upraszczającym polski tekst urzędowy. "
)
USER_INSTRUCTION = "Uprość tekst. Zwróć wyłącznie zmodyfikowany tekst:\n\n"

app = FastAPI()

# If your frontend runs on the same origin, you can remove CORS.
app.add_middleware(
CORSMiddleware,
allow_origins=[
    "http://localhost:8000",
    "http://localhost:8001",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8001"
],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

@app.post("/api/simplify")
async def simplify(request: Request):
    try:
        payload = await request.json()
    except Exception:
        return JSONResponse({"error": "Invalid JSON"}, status_code=400)

    text = (payload or {}).get("text", "")
    if not text or not str(text).strip():
        return JSONResponse({"error": "Missing 'text'"}, status_code=400)

    try:
        # Build messages for your model
        messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": USER_INSTRUCTION + str(text)}
        ]
        # LangChain’s ChatOpenAI accepts call with messages via .invoke
        response = llm.invoke(messages)
        result = str((response.content or "").strip())
        lines = result.splitlines()
        clean = "\n".join(lines[2:])
        if not clean:
            return JSONResponse({"error": "Empty response from model"}, status_code=502)
        return JSONResponse({"result": clean})
    except Exception as e:
        # Log e if needed
        return JSONResponse({"error": "Assistant call failed"}, status_code=502)
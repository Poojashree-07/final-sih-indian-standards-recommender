import json
from sentence_transformers import SentenceTransformer, util

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

print("Loading standard embeddings...")
with open("standards-embeddings.json", "r", encoding="utf-8") as f:
    standards = json.load(f)

query = "packaged drinking water for human consumption"

print()
print("Query:", query)
print("Creating query embedding...")

query_embedding = model.encode(query, convert_to_tensor=True)

results = []

for standard in standards:
    standard_embedding = standard["embedding"]

    score = util.cos_sim(
        query_embedding,
        standard_embedding
    ).item()

    results.append({
        "code": standard["code"],
        "title": standard["title"],
        "score": score
    })

results.sort(key=lambda x: x["score"], reverse=True)

print()
print("===== SEMANTIC SEARCH RESULTS =====")

for i, result in enumerate(results[:10], start=1):
    print(
        f"{i}. {result['code']} | "
        f"{result['title']} | "
        f"Similarity: {result['score']:.4f}"
    )
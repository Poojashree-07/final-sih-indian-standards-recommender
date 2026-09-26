from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import json

app = Flask(__name__)

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

print("Loading standard embeddings...")
with open("standards-embeddings.json", "r", encoding="utf-8") as f:
    standards = json.load(f)

print(f"Loaded {len(standards)} standard embeddings.")


@app.route("/semantic-search", methods=["POST"])
def semantic_search():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({
            "error": "Query is required"
        }), 400

    query = data["query"].strip()

    if not query:
        return jsonify({
            "error": "Query cannot be empty"
        }), 400

    print(f"Semantic query: {query}")

    query_embedding = model.encode(
        query,
        convert_to_tensor=True
    )

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
            "score": round(score, 4)
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return jsonify({
        "query": query,
        "results": results[:10]
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "standards_loaded": len(standards)
    })


if __name__ == "__main__":
    print()
    print("====================================")
    print("Semantic Search API")
    print("====================================")
    print("Server running at http://127.0.0.1:5000")
    print()

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
import json
from sentence_transformers import SentenceTransformer

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

print("Loading general standards...")
with open("standards.json", "r", encoding="utf-8") as f:
    general_standards = json.load(f)

print("Loading detailed food standards...")
with open("food-standards.json", "r", encoding="utf-8") as f:
    food_standards = json.load(f)

all_standards = []

for standard in general_standards:
    text = " ".join([
        str(standard.get("code", "")),
        str(standard.get("title", "")),
        str(standard.get("category", "")),
        str(standard.get("domain", "")),
        str(standard.get("status", "")),
    ])

    all_standards.append({
        "code": standard.get("code"),
        "title": standard.get("title"),
        "text": text
    })

for standard in food_standards:
    text = " ".join([
        str(standard.get("Code", "")),
        str(standard.get("Title", "")),
        str(standard.get("Scope", "")),
        str(standard.get("Material", "")),
        str(standard.get("Grade", "")),
        str(standard.get("Dimensions", "")),
        str(standard.get("Performance", "")),
        str(standard.get("Mechanical Properties", "")),
        str(standard.get("Testing", "")),
        str(standard.get("Sampling", "")),
        str(standard.get("Acceptance Criteria", "")),
        str(standard.get("Marking", "")),
        str(standard.get("Application", "")),
        str(standard.get("Evidence / Section", "")),
    ])

    all_standards.append({
        "code": standard.get("Code"),
        "title": standard.get("Title"),
        "text": text
    })

print(f"Total standards to embed: {len(all_standards)}")
print("Creating embeddings...")

texts = [standard["text"] for standard in all_standards]

vectors = model.encode(
    texts,
    batch_size=32,
    show_progress_bar=True
)

output = []

for standard, vector in zip(all_standards, vectors):
    output.append({
        "code": standard["code"],
        "title": standard["title"],
        "embedding": vector.tolist()
    })

with open("standards-embeddings.json", "w", encoding="utf-8") as f:
    json.dump(output, f)

print()
print("SUCCESS!")
print(f"Created embeddings for {len(output)} standards.")
print("File: standards-embeddings.json")
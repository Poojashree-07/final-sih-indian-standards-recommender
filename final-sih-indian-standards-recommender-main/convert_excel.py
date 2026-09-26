import pandas as pd
import json

# Excel file
excel_file = r"C:\Users\LALITH\Downloads\InfraLens-IS-Codes-Complete-List.xlsx"

# Read the Excel file
df = pd.read_excel(excel_file)

# Keep only rows that have an IS Code
df = df[df["Code"].notna()].copy()

records = []

for idx, row in df.iterrows():
    records.append({
        "id": f"is-{idx}",
        "code": str(row["Code"]).strip(),
        "part": str(row["Part"]).strip() if pd.notna(row["Part"]) else None,
       "year": int(row["Year"]) if pd.notna(row["Year"]) else None,
        "title": str(row["Title"]).strip(),
        "category": str(row["Category"]).strip(),
        "status": str(row["Status"]).strip(),
        "domain": str(row["Domain"]).strip()
    })

# Save as JSON
with open("standards.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2, ensure_ascii=False)

print(f"Successfully converted {len(records)} standards!")
print("Created: standards.json")
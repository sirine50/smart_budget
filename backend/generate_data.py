import csv
import random

# A blueprint of clean categories mapped to messy real-world variations
data_blueprint = {
    "Food & Dining": [
        "STARBUCKS COFFEE #4921", "starbucks cafe", "MCDONALDS F1029", 
        "UBER EATS* PENDING", "DOMINOS PIZZA - 4920", "GROCERY WHOLEFDS"
    ],
    "Utilities & Bills": [
        "NETFLIX.COM SUB DIGTL", "SPOTIFY PREMIUM", "ATT*BILL PAY 9201",
        "COMCAST CABLE WIRELESS", "POWER & LIGHT CO.", "CITY WATER DIST"
    ],
    "Shopping & Retail": [
        "AMZN Mktp US*AM201", "AMAZON.COM*DIRECT", "WAL-MART SUPER CTR",
        "TARGET STORES 0029", "NIKE ONLINE STORE", "ZARA USA"
    ],
    "Transportation": [
        "UBER TRIP HELP.UBER", "LYFT *RIDE MON", "SHELL OIL 92041",
        "EXXONMOBIL POSTED", "METRO TRANSIT AUTH"
    ]
}

def generate_messy_csv(filename="raw_transactions.csv", num_rows=400):
    categories = list(data_blueprint.keys())
    
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Writing headers
        writer.writerow(["Description", "Amount", "Category"])
        
        for _ in range(num_rows):
            # Pick a random true category
            true_category = random.choice(categories)
            # Pick a messy base string from that category
            base_desc = random.choice(data_blueprint[true_category])
            
            # Injecting Dirt #1 & #2: Messy casing and random noise strings
            noise = random.choice(["", " #112", " WWW.ST", " CA", " - POSTED", " 800-555"])
            description = base_desc + noise
            if random.random() < 0.3:
                description = description.lower()
            elif random.random() < 0.3:
                description = description.upper()
                
            # Injecting Dirt #3: Random special characters
            if random.random() < 0.2:
                description = description.replace(" ", random.choice(["*", "-", "///"]))
                
            # Generate a random amount
            amount = round(random.uniform(5.0, 150.0), 2)
            
            # Injecting Dirt #4: Missing data (simulate an error)
            if random.random() < 0.05:
                amount = "" # Empty price
            if random.random() < 0.03:
                description = "" # Empty description
                
            writer.writerow([description, amount, true_category])
            
    print(f"Success! Generated {num_rows} messy rows in '{filename}'")

if __name__ == "__main__":
    generate_messy_csv()
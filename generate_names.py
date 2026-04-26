import json
import random

random.seed(42)

# Lists of popular/famous names from across the world
first_names = [
    # English/European
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
    "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
    "Christopher", "Lisa", "Daniel", "Nancy", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
    "Oliver", "Charlotte", "George", "Amelia", "Harry", "Olivia", "Noah", "Isla", "Jack", "Ava",
    "Leo", "Mia", "Arthur", "Sophia", "Oscar", "Grace", "Henry", "Freya", "Charlie", "Lily",
    "Alexander", "Catherine", "Victoria", "Edward", "Richard", "Eleanor", "Margaret", "Albert",
    # Spanish/Latin
    "Maria", "Jose", "Carmen", "Juan", "Ana", "Luis", "Isabel", "Carlos", "Dolores", "Jesus",
    "Sofia", "Mateo", "Valentina", "Santiago", "Camila", "Diego", "Valeria", "Alejandro", "Lucia", "Gael",
    "Isabella", "Leonardo", "Miguel", "Elena", "Javier", "Teresa", "Fernando", "Rosa", "Ricardo", "Gloria",
    # Asian
    "Wei", "Fang", "Jian", "Min", "Lei", "Na", "Qiang", "Jing", "Tao", "Yan",
    "Hiroshi", "Yoko", "Kenji", "Keiko", "Ichiro", "Yumi", "Takashi", "Mika", "Satoshi", "Emi",
    "Ji-hoon", "Seo-yeon", "Hyun-woo", "Min-seo", "Dong-hyun", "Ji-min", "Ji-hu", "Seo-hyeon", "Min-jae", "Ha-eun",
    "Ming", "Hua", "Cheng", "Mei", "Jin", "Hui", "Feng", "Lin", "Bo", "Xiu",
    # Arabic/Middle Eastern
    "Muhammad", "Fatima", "Ahmad", "Aisha", "Ali", "Zainab", "Omar", "Maryam", "Youssef", "Amira",
    "Tariq", "Salma", "Hassan", "Noor", "Ibrahim", "Huda", "Hussein", "Layla", "Khalid", "Farah",
    "Mustafa", "Khadija", "Tariq", "Yasmin", "Zayed", "Rania", "Adel", "Samira", "Rashid", "Nadia",
    # Indian/South Asian
    "Aarav", "Aditi", "Vihaan", "Diya", "Arjun", "Kavya", "Sai", "Neha", "Ishaan", "Pooja",
    "Rohan", "Anjali", "Aditya", "Riya", "Dhruv", "Sneha", "Kabir", "Shruti", "Rahul", "Priya",
    "Siddharth", "Aishwarya", "Vikram", "Kareena", "Raj", "Meera", "Ravi", "Simran", "Amit", "Kiran",
    # African
    "Kwame", "Abena", "Kofi", "Akosua", "Yaw", "Yaa", "Kofi", "Ama", "Nia", "Zane",
    "Thabo", "Lindiwe", "Sipho", "Zanele", "Bongani", "Ayanda", "Jabulani", "Nothando", "Mandla", "Sibongile",
    "Nelson", "Winnie", "Desmond", "Miriam", "Chinua", "Ngozi", "Kofi", "Wangari", "Julius", "Ellen",
    # Slavic
    "Ivan", "Anna", "Dmitry", "Maria", "Sergey", "Elena", "Mikhail", "Natalia", "Alexey", "Olga",
    "Andrei", "Tatiana", "Nikolai", "Svetlana", "Vladimir", "Yulia", "Pavel", "Irina", "Artem", "Ekaterina",
    "Boris", "Katarina", "Igor", "Mila", "Lev", "Anastasia", "Maxim", "Polina", "Roman", "Daria"
]

last_names = [
    # English/European
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Churchill", "Shakespeare", "Darwin", "Newton", "Dickens", "Austen", "Tolkien", "Lennon", "McCartney",
    # Spanish/Latin
    "Perez", "Sanchez", "Ramirez", "Torres", "Flores", "Rivera", "Gomez", "Diaz", "Cruz", "Reyes",
    "Morales", "Ortiz", "Gutierrez", "Chavez", "Ramos", "Ruiz", "Mendoza", "Alvarez", "Castillo", "Romero",
    "Picasso", "Dali", "Goya", "Marquez", "Borges", "Neruda", "Kahlo", "Rivera", "Paz", "Cortazar",
    # Asian
    "Wang", "Li", "Zhang", "Liu", "Chen", "Yang", "Huang", "Zhao", "Wu", "Zhou",
    "Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Kato",
    "Kim", "Lee", "Park", "Choi", "Jeong", "Kang", "Jo", "Yoon", "Jang", "Lim",
    "Miyazaki", "Murakami", "Kurosawa", "Ozu", "Mishima", "Kawabata", "Oe", "Abe", "Natsume", "Akutagawa",
    # Arabic/Middle Eastern
    "Khan", "Ali", "Ahmed", "Syed", "Hassan", "Hussain", "Mahmoud", "Ibrahim", "Abbas", "Youssef",
    "Osman", "Rahman", "Saleh", "Mustafa", "Sulaiman", "Mansour", "Khalil", "Saad", "Zayed", "Rashid",
    "Mahfouz", "Darwish", "Gibran", "Said", "Adonis", "Maalouf", "Qabbani", "Idris", "Haqqi", "Aqqad",
    # Indian/South Asian
    "Patel", "Singh", "Sharma", "Kumar", "Das", "Bose", "Gupta", "Jain", "Mehta", "Desai",
    "Reddy", "Rao", "Nair", "Iyer", "Pillai", "Menon", "Verma", "Chauhan", "Yadav", "Rajput",
    "Gandhi", "Tagore", "Raman", "Bose", "Ambedkar", "Tata", "Ambani", "Tendulkar", "Kohli", "Bachchan",
    # African
    "Mensah", "Osei", "Owusu", "Boateng", "Appiah", "Amoah", "Agyemang", "Asare", "Kumi", "Ofori",
    "Dlamini", "Nkosi", "Khumalo", "Sithole", "Mthembu", "Ndlovu", "Zuma", "Mabaso", "Mokoena", "Mnguni",
    "Mandela", "Tutu", "Achebe", "Maathai", "Soyinka", "Nyerere", "Kenyatta", "Gordimer", "Coetzee", "Senghor",
    # Slavic
    "Ivanov", "Smirnov", "Kuznetsov", "Popov", "Sokolov", "Lebedev", "Kozlov", "Novikov", "Morozov", "Petrov",
    "Volkov", "Solovyov", "Vasiliev", "Zaitsev", "Pavlov", "Semenov", "Golubev", "Vinogradov", "Bogdanov", "Vorobyov",
    "Tolstoy", "Dostoevsky", "Chekhov", "Pushkin", "Gogol", "Turgenev", "Nabokov", "Bulgakov", "Pasternak", "Solzhenitsyn"
]

quotes = []

# Generate single names (1 word)
for name in first_names:
    quotes.append({
        "text": name,
        "author": "Human Name",
        "mood": "Names",
        "wordCount": 1
    })

# Ensure uniqueness
seen = set()

# Generate 900 more multi-word names to easily exceed 1000
for _ in range(1200):
    first = random.choice(first_names)
    last = random.choice(last_names)
    
    text = f"{first} {last}"
    word_count = 2
    
    # Randomly add middle name (3 words)
    if random.random() < 0.15:
        middle = random.choice(first_names)
        text = f"{first} {middle} {last}"
        word_count = 3
        
    if text not in seen:
        seen.add(text)
        quotes.append({
            "text": text,
            "author": "Human Name",
            "mood": "Names",
            "wordCount": word_count
        })

# Total should be around 1400

js_content = "const namesDatabase = " + json.dumps(quotes, indent=4) + ";\n"
js_content += """
// Merge with main database
namesDatabase.forEach(quote => {
    quotesDatabase.push(quote);
});
"""

with open("names.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(quotes)} names.")

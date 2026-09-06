import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Array "mo:core/Array";

module {
  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type ScanRecord = {
    id : Nat;
    imageUrl : Blob;
    videoUrl : ?Blob;
    diseaseName : Text;
    confidence : Float;
    severity : Text;
    description : Text;
    symptoms : [Text];
    treatment : [Text];
    prevention : [Text];
    organicSuggestions : [Text];
    expertAdvice : Text;
    timestamp : Int;
  };

  type DiseaseEntry = {
    crop : Text;
    name : Text;
    imageUrl : Blob;
    symptoms : [Text];
    causes : [Text];
    treatment : [Text];
    prevention : [Text];
  };

  type ChatRole = {
    #user;
    #assistant;
  };

  type ChatMessage = {
    role : ChatRole;
    content : Text;
    timestamp : Int;
  };

  type OldActor = {};

  type NewActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, UserRole>;
    };
    scans : Map.Map<Nat, ScanRecord>;
    library : List.List<DiseaseEntry>;
    chat : List.List<ChatMessage>;
    scanCounter : { var next : Nat };
    chatSession : { var id : Nat };
  };

  func disease(crop : Text, name : Text, symptoms : [Text], causes : [Text], treatment : [Text], prevention : [Text]) : DiseaseEntry {
    {
      crop;
      name;
      imageUrl = Array.toBlob([]);
      symptoms;
      causes;
      treatment;
      prevention;
    };
  };

  func seedLibrary() : List.List<DiseaseEntry> {
    let entries = [
      // ---- Tomato ----
      disease(
        "Tomato",
        "Early Blight",
        ["Dark brown spots with concentric rings on lower leaves", "Yellowing of leaves around spots", "Defoliation starting from the bottom", "Sunken lesions on stems and fruit"],
        ["Fungus Alternaria solani", "Warm, humid weather", "Poor air circulation", "Splash irrigation"],
        ["Remove and destroy infected leaves", "Apply copper-based or chlorothalonil fungicide", "Mulch around plants to prevent soil splash", "Water at the base, not on foliage"],
        ["Rotate crops every 2-3 years", "Space plants for good airflow", "Use disease-free seeds", "Avoid overhead watering"]
      ),
      disease(
        "Tomato",
        "Late Blight",
        ["Water-soaked, greasy-looking spots on leaves", "White fuzzy mold on leaf undersides in humid weather", "Dark brown lesions on stems", "Hard, dark, greasy spots on fruit"],
        ["Oomycete Phytophthora infestans", "Cool, wet weather", "High humidity", "Infected plant debris"],
        ["Remove infected plants immediately", "Apply fungicides containing mancozeb or chlorothalonil", "Destroy infected plant material", "Improve air circulation"],
        ["Plant resistant varieties", "Avoid overhead irrigation", "Remove volunteer tomato plants", "Monitor weather forecasts for disease alerts"]
      ),
      disease(
        "Tomato",
        "Tomato Blossom End Rot",
        ["Sunken, dark, leathery spots at the blossom end of fruit", "Enlarging brown-black lesions", "Fruit rot that can invite secondary infections"],
        ["Calcium deficiency in the fruit", "Irregular watering", "Excess nitrogen fertilization", "Root damage or stress"],
        ["Remove affected fruit", "Apply calcium-rich foliar spray", "Maintain consistent soil moisture", "Mulch to retain soil moisture"],
        ["Test and amend soil calcium", "Water consistently and deeply", "Avoid over-fertilizing with nitrogen", "Use mulch to stabilize soil moisture"]
      ),
      disease(
        "Tomato",
        "Tomato Leaf Curl",
        ["Upward curling and crinkling of leaves", "Yellowing and stunting of new growth", "Reduced fruit set", "Thickened, leathery leaves"],
        ["Whitefly-transmitted begomovirus", "High whitefly populations", "Infected transplants", "Weeds that harbor the virus"],
        ["Control whiteflies with insecticidal soap or neem oil", "Remove and destroy infected plants", "Use reflective mulch to repel whiteflies", "Apply yellow sticky traps"],
        ["Use virus-resistant varieties", "Exclude whiteflies with row covers", "Control weeds around the field", "Inspect transplants before planting"]
      ),
      // ---- Potato ----
      disease(
        "Potato",
        "Potato Late Blight",
        ["Water-soaked lesions on leaves", "White mold on leaf undersides", "Dark brown stems and tubers", "Rapid plant collapse in wet weather"],
        ["Oomycete Phytophthora infestans", "Cool, wet conditions", "Infected seed tubers", "Cull piles of infected potatoes"],
        ["Destroy infected plants", "Apply protective fungicides", "Harvest tubers only after vines die back", "Dry tubers before storage"],
        ["Plant certified disease-free seed", "Use resistant varieties", "Hill soil over tubers", "Destroy volunteer plants and cull piles"]
      ),
      disease(
        "Potato",
        "Potato Scab",
        ["Rough, corky, brown lesions on tuber surface", "Raised or pitted scabs", "Reduced market quality", "Lesions that enlarge during storage"],
        ["Bacterium Streptomyces scabies", "Dry, alkaline soil", "Low soil moisture at tuber set", "Fresh manure or high pH"],
        ["No cure for infected tubers", "Maintain consistent soil moisture", "Adjust soil pH to 5.2-5.5", "Rotate with non-host crops"],
        ["Plant resistant varieties", "Irrigate regularly during tuber formation", "Avoid fresh manure", "Rotate crops on a 3-4 year cycle"]
      ),
      disease(
        "Potato",
        "Potato Early Blight",
        ["Small brown spots with concentric rings on older leaves", "Yellowing around lesions", "Leaf drop from the bottom up", "Dark lesions on tubers"],
        ["Fungus Alternaria solani", "Warm, humid weather", "Nutrient stress", "Frequent wetting of foliage"],
        ["Apply chlorothalonil or mancozeb fungicides", "Remove infected foliage", "Improve plant nutrition", "Water at the base"],
        ["Rotate crops", "Use resistant varieties", "Maintain balanced fertility", "Avoid overhead irrigation"]
      ),
      // ---- Corn ----
      disease(
        "Corn",
        "Corn Leaf Blight",
        ["Long, elliptical, tan or brown lesions on leaves", "Lesions that merge and kill large leaf areas", "Reduced photosynthesis", "Premature leaf death"],
        ["Fungus Helminthosporium turcicum", "Warm, humid weather", "Extended leaf wetness", "Infected crop residue"],
        ["Apply protective fungicides", "Plant resistant hybrids", "Rotate away from corn", "Tillage to bury residue"],
        ["Use resistant hybrids", "Rotate crops", "Manage residue", "Monitor weather for favorable disease conditions"]
      ),
      disease(
        "Corn",
        "Corn Smut",
        ["Large, grayish-white galls on ears, tassels, and stalks", "Galls that turn black and powdery", "Reduced yield", "Distorted plant growth"],
        ["Fungus Ustilago maydis", "Wounding from hail or insects", "Excess nitrogen", "Drought stress followed by rain"],
        ["Remove and destroy galls before they burst", "Avoid mechanical injury to plants", "Balance nitrogen fertilization", "Rotate crops"],
        ["Plant tolerant hybrids", "Avoid over-fertilizing with nitrogen", "Control insect pests", "Remove galls promptly"]
      ),
      disease(
        "Corn",
        "Corn Stalk Rot",
        ["Premature death and lodging of stalks", "Soft, discolored lower internodes", "Empty or poorly filled ears", "Stalks that break easily"],
        ["Multiple fungi including Fusarium and Gibberella", "Stress from drought or excess nitrogen", "High plant density", "Insect damage"],
        ["Harvest affected fields early", "Improve drainage", "Balance fertility", "Reduce plant density"],
        ["Plant resistant hybrids", "Avoid excessive nitrogen", "Manage plant population", "Rotate crops"]
      ),
      // ---- Apple ----
      disease(
        "Apple",
        "Apple Scab",
        ["Olive-green to black velvety spots on leaves", "Corky, dark lesions on fruit", "Leaf drop", "Distorted, cracked fruit"],
        ["Fungus Venturia inaequalis", "Cool, wet spring weather", "Infected fallen leaves", "High humidity"],
        ["Apply fungicides during early season", "Rake and destroy fallen leaves", "Prune for airflow", "Remove infected fruit"],
        ["Plant resistant varieties", "Clean up leaf litter in fall", "Apply dormant sprays", "Maintain good canopy airflow"]
      ),
      disease(
        "Apple",
        "Apple Fire Blight",
        ["Sudden wilting and blackening of blossoms and shoots", "Bent, shepherd's-crook shoot tips", "Cankers on branches", "Bacterial ooze in wet weather"],
        ["Bacterium Erwinia amylovora", "Warm, humid spring weather", "Insect and rain spread", "Open blossoms"],
        ["Prune out infected branches 12 inches below the canker", "Disinfect pruning tools", "Apply streptomycin during bloom", "Remove severely infected trees"],
        ["Plant resistant varieties", "Avoid excessive nitrogen", "Control sucking insects", "Prune during dry weather"]
      ),
      disease(
        "Apple",
        "Apple Powdery Mildew",
        ["White, powdery fungal growth on leaves and shoots", "Stunted, distorted new growth", "Silver-gray leaf discoloration", "Reduced fruit quality"],
        ["Fungus Podosphaera leucotricha", "Warm, dry days and cool nights", "High humidity", "Dense canopy"],
        ["Apply sulfur or fungicide sprays", "Prune out infected shoots", "Improve air circulation", "Remove infected leaves"],
        ["Plant resistant varieties", "Prune for airflow", "Avoid overhead irrigation", "Monitor early in the season"]
      ),
      // ---- Pepper ----
      disease(
        "Pepper",
        "Pepper Bacterial Spot",
        ["Small, water-soaked spots on leaves", "Raised, scabby lesions on fruit", "Yellow halos around leaf spots", "Leaf drop"],
        ["Bacterium Xanthomonas campestris", "Warm, wet weather", "Splash irrigation", "Infected seeds"],
        ["Apply copper-based bactericides", "Remove infected plants", "Avoid working in wet fields", "Use drip irrigation"],
        ["Use disease-free seed", "Rotate crops", "Avoid overhead watering", "Plant resistant varieties"]
      ),
      disease(
        "Pepper",
        "Pepper Anthracnose",
        ["Sunken, circular, water-soaked spots on fruit", "Dark, sunken lesions with pink spore masses", "Fruit rot", "Premature fruit drop"],
        ["Fungi Colletotrichum species", "Warm, wet weather", "Splash irrigation", "Infected plant debris"],
        ["Remove infected fruit", "Apply protective fungicides", "Improve airflow", "Harvest promptly"],
        ["Use disease-free seed", "Rotate crops", "Avoid overhead irrigation", "Remove plant debris after harvest"]
      ),
      disease(
        "Pepper",
        "Pepper Blossom End Rot",
        ["Sunken, dark, leathery spots at the blossom end of fruit", "Enlarging brown lesions", "Secondary rot", "Reduced market quality"],
        ["Calcium deficiency", "Irregular watering", "Excess nitrogen", "Root stress"],
        ["Remove affected fruit", "Apply calcium foliar spray", "Maintain consistent moisture", "Mulch to retain moisture"],
        ["Water consistently", "Amend soil calcium", "Avoid excess nitrogen", "Use mulch"]
      ),
      // ---- Grape ----
      disease(
        "Grape",
        "Grape Powdery Mildew",
        ["White, powdery fungal growth on leaves, shoots, and berries", "Distorted, stunted growth", "Cracked or russeted berries", "Reduced yield and quality"],
        ["Fungus Erysiphe necator", "Warm, humid weather", "Dense canopy", "Shaded fruit"],
        ["Apply sulfur or fungicide sprays", "Prune for airflow", "Remove infected clusters", "Improve canopy management"],
        ["Plant resistant varieties", "Prune to open the canopy", "Avoid overhead irrigation", "Monitor early in the season"]
      ),
      disease(
        "Grape",
        "Grape Downy Mildew",
        ["Yellow, oily spots on upper leaf surfaces", "White, downy growth on leaf undersides", "Shoot and berry infection", "Premature leaf drop"],
        ["Oomycete Plasmopara viticola", "Wet, humid weather", "Extended leaf wetness", "Infected leaf litter"],
        ["Apply protective fungicides", "Remove infected leaves", "Improve airflow", "Rake and destroy fallen leaves"],
        ["Plant resistant varieties", "Prune for airflow", "Avoid overhead irrigation", "Manage canopy density"]
      ),
      disease(
        "Grape",
        "Grape Black Rot",
        ["Small, brown circular spots on leaves", "Black, mummified berries", "Cankers on shoots", "Rapid fruit rot"],
        ["Fungus Guignardia bidwellii", "Warm, wet weather", "Infected mummies", "Splash irrigation"],
        ["Remove mummified berries", "Apply protective fungicides", "Prune out infected shoots", "Improve airflow"],
        ["Remove mummies in winter", "Plant resistant varieties", "Prune for airflow", "Avoid overhead irrigation"]
      ),
    ];
    List.fromArray(entries)
  };

  public func migration(_old : OldActor) : NewActor {
    {
      accessControlState = {
        var adminAssigned = false;
        userRoles = Map.empty();
      };
      scans = Map.empty();
      library = seedLibrary();
      chat = List.empty();
      scanCounter = { var next = 0 };
      chatSession = { var id = 0 };
    };
  };
};

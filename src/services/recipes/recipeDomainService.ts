import RecipeRepository from "src/data/recipesRepository/recipeRepository";
import RecipeAbstarctService from "src/services/recipes/recipeAbstractService";
import RecipeEntity from "src/services/recipes/recipeEntity";
import { v4 as uuidv4 } from 'uuid';

class RecipeDomainService implements RecipeAbstarctService {
  private readonly recipeRepository: RecipeRepository;

  constructor(repo: RecipeRepository) {
    this.recipeRepository = repo;
  }
  public async getRecipeByName(name: string): Promise<RecipeEntity> {
    const res = await this.recipeRepository.getRecipeByName(name);
    return res;
  }
  public async getCreatorRecipes(creator: string): Promise<any[]> {
    const res = await this.recipeRepository.getCreatorRecipes(creator);
    return res;
  }

  public async createRecipe(name: string, creator: string, ingredients: string[]): Promise<string> {
    const id = uuidv4();
    await this.recipeRepository.createRecipe(new RecipeEntity(id, ingredients, creator, name));
    return id;
  }
  public async returnAll(): Promise<RecipeEntity[]> {
    const recipes = await this.recipeRepository.returnAll();
    return recipes;
  }

}

export default RecipeDomainService;

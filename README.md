# JavaScript Constructors

1. Navigate to this project in your terminal.
2. Run `live-server`.
3. Open [http://localhost:8080](http://localhost:8080) in Chrome.

*You should see failing tests.*

Create 3 constructor functions by following the comments in `constructors.js`.
*Write all of the constructor functions below in `constructors.js`*

After you complete a test:

1. Save `constructors.js`.
2. Reload [http://localhost:8080](http://localhost:8080) in Chrome.
3. Check if the test passes.
4. If it passes, [commit your work](http://git-scm.com/book/en/Git-Basics-Recording-Changes-to-the-Repository).

Some comments meant to be nested inside of the constructor function, be sure your code follows the same structure.

**Example (Before)**

```javascript
/**
 * An example constructor.
 * @class Represents a constructor function.
 * @param {string} description – The example's description.
 */

  /**
   * Returns the example's description.
   * @return {string} description – This example's description.
   */
```

**Example (After)**

```javascript
/**
 * An example constructor.
 * @class Represents a constructor function.
 * @param {string} description – The example's description.
 */
function Example (description) {
  this.description = description;
}
  /**
   * Returns the example's description.
   * @return {string} description – This example's description.
   */
Example.prototype.getDescription = function() {
  return this.description;
};
```

---

# Spell(name, cost, description)
Creates a generic spell that can be cast.

**Parameters**

**name**: string, The name of the spell.

**cost**: number, The amount needed to cast this spell.

**description**: string, A short description of the spell.


## getDetails()
Returns a string of all of the spell's details.
The format doesn't matter, as long as it contains the spell name, cost, and description.


# DamageSpell(name, cost, damage, description)
A spell that deals damage.
We want to keep this code DRY (Don't Repeat Yourself).

So you should use `Spell.call()` to assign the spell name, cost, and description.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

In addition, you will also want to assign `DamageSpell.prototype`
a value so that it inherits from `Spell`.
Make sure to call this OUTSIDE of the function declaration.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype

**Parameters**

**name**: string, The name of the spell.

**cost**: number, The amount needed to cast this spell.

**damage**: number, The amount of damage this spell deals.

**description**: string, A short description of the spell.


# Spellcaster(name, health, mana)
Now that you've created some spells, let's create
`Spellcaster` objects that can use them!

**Parameters**

**name**: string, The spellcaster's name.

**health**: number, The spellcaster's health points.

**mana**: number, The spellcaster's mana points, used for casting spells.


## inflictDamage(damage)
The spellcaster loses health equal to `damage`.
Health should never be negative.
If the spellcaster's health drops to 0,
its `isAlive` property should be set to `false`.

**Parameters**

**damage**: number, Amount of damage to deal to the spellcaster


## spendMana(cost)
Reduces the spellcaster's mana by `cost`.
Mana should only be reduced only if there is enough mana to spend.

**Parameters**

**cost**: number, The amount of mana to spend.

**Returns**: boolean, Whether mana was successfully spent.

## invoke(spell, target)
Allows the spellcaster to cast spells.
The first parameter should either be a `Spell` or `DamageSpell`.
If it is a `DamageSpell`, the second parameter should be a `Spellcaster`.
The function should return `false` if neither of the conditions are not satisfied.

You should use `instanceof` to check for these conditions.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

Next check if the spellcaster has enough mana to cast the spell.
If it can cast a spell, it should lose mana  equal to the spell's cost.
If there is not enough mana, return `false`.

If there is enough mana to cast the spell, return `true`.
In addition, if it is a `DamageSpell` reduce the target's health by the spell's damage value.

Use functions you've previously created: (`inflictDamage`, `spendMana`)
to help you with this.

**Parameters**

**spell**: Spell | DamageSpell, The spell to be cast.

**target**: Spellcaster, The spell target to be inflicted.

**Returns**: boolean, Whether the spell was successfully cast.

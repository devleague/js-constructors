var expect = chai.expect;
var should = chai.should();
var sandbox;

beforeEach(function() {
  // create a sandbox
  sandbox = sinon.sandbox.create();
});

afterEach(function() {
  sandbox.restore();
});

describe('Spell', function() {

  it('should be a function', function() {
    expect(Spell).to.be.a('function');
  });

  describe('instance object', function() {

    it('should have a name', function() {
      var fireball = new Spell('Fireball', 5, 'Conjures a ball of fire.');
      fireball.name.should.equal('Fireball');

      var iceblast = new Spell('Ice Blast', 15, 'Creates a blast of ice, freezing any living thing where it stands.');
      iceblast.name.should.equal('Ice Blast');
    });

    it('should have a cost', function() {
      var fireball = new Spell('Fireball', 5, 'Conjures a ball of fire.');
      fireball.cost.should.equal(5);

      var iceblast = new Spell('Ice Blast', 15, 'Creates a blast of ice, freezing any living thing where it stands.');
      iceblast.cost.should.equal(15);
    });

    it('should have a description', function() {
      var fireball = new Spell('Fireball', 5, 'Conjures a ball of fire.');
      fireball.description.should.equal('Conjures a ball of fire.');

      var iceblast = new Spell('Ice Blast', 15, 'Creates a blast of ice, freezing any living thing where it stands.');
      iceblast.description.should.equal('Creates a blast of ice, freezing any living thing where it stands.');
    });

    it('should get a string containing all of the spell\'s information', function() {
      var fireball = new Spell('Fireball', 5, 'Conjures a ball of fire.');
      var fireballDetails = fireball.getDetails();

      expect(fireballDetails.match(/\b(Fireball|5|Conjures a ball of fire\.)/g).length).to.be.at.least(3);

      var iceBlast = new Spell('Ice Blast', 15, 'Creates a blast of ice, freezing any living thing where it stands.');
      var iceBlastDetails = iceBlast.getDetails();

      expect(iceBlastDetails.match(/\b(Ice Blast|15|Creates a blast of ice, freezing any living thing where it stands\.)/g).length).to.not.be.greaterThan(3);
    });
  });
});

describe('DamageSpell', function() {
  it('should be a function', function() {
    expect(DamageSpell).to.be.a('function');
  });

  it('should call Spell\'s constructor function', function() {
    sandbox.stub(window.Spell, "call");
    var damageSpell = new DamageSpell('Damage Spell', 23, 42, 'Deals damage.');
    sinon.assert.calledWithExactly(Spell.call, damageSpell, 'Damage Spell', 23, 'Deals damage.');
    sandbox.restore();
  });

  it('should be both an instance of Spell and DamageSpell', function() {
    var damageSpell = new DamageSpell('Damage Spell', 23, 42, 'Deals damage.');
    damageSpell.should.be.an.instanceof(Spell);
    damageSpell.should.be.an.instanceof(DamageSpell);
  });

  describe('instance object', function() {
    it('should inflict an amount of damage', function() {
      var forcePulse = new DamageSpell('Force Pulse', 50, 15, 'Strikes a foe with a powerful blast, knocking them to the ground.');
      forcePulse.damage.should.equal(15);

      var electricShock = new DamageSpell('Electric Shock', 15, 30, 'Sends a jolt of electricity, may paralyze the target.');
      electricShock.damage.should.equal(30);
    });

    it('should have a name', function() {
      var forcePulse = new DamageSpell('Force Pulse', 50, 15, 'Strikes a foe with a powerful blast, knocking them to the ground.');
      forcePulse.name.should.equal('Force Pulse');
    });

    it('should have a cost', function() {
      var forcePulse = new DamageSpell('Force Pulse', 50, 15, 'Strikes a foe with a powerful blast, knocking them to the ground.');
      forcePulse.cost.should.equal(50);
    });

    it('should have a description', function() {
      var forcePulse = new DamageSpell('Force Pulse', 50, 15, 'Strikes a foe with a powerful blast, knocking them to the ground.');
      forcePulse.description.should.equal('Strikes a foe with a powerful blast, knocking them to the ground.');
    });

  });
});

describe('Spellcaster', function() {

  it('should be a function', function() {
    expect(Spellcaster).to.be.a('function');
  });

  describe('instance object', function() {

    it('should have a name', function() {
      var alice = new Spellcaster('Alice', 300, 125);
      expect(alice.name).to.be.a('string');
      alice.name.should.equal('Alice');
    });

    it('should have health', function() {
      var bob = new Spellcaster('Bob', 300, 125);
      expect(bob.health).to.be.a('number');
      bob.health.should.at.least(1);
    });

    it('should have mana', function() {
      var chuck = new Spellcaster('Chuck', 300, 125);
      expect(chuck.mana).to.be.a('number');
      chuck.mana.should.at.least(1);
    });

    it('should be alive', function() {
      var diane = new Spellcaster('Diane', 300, 125);
      expect(diane.isAlive).to.be.a('boolean');
      diane.isAlive.should.be.true;
    });

    describe('.inflictDamage', function() {

      it ('should be a function', function() {
        var edward = new Spellcaster('Edward', 300, 125);
        expect(edward.inflictDamage).to.be.a('function');
      });

      it('should be able to take damage', function() {
        var fred = new Spellcaster('Fred', 300, 125),
            fullHealth = fred.health;
        fred.inflictDamage(fred.health - 1);
        fred.health.should.be.below(fullHealth);
      });

      it('should be able to deal lethal damage', function() {
        var greg = new Spellcaster('Greg', 300, 125);
        greg.inflictDamage(greg.health);
        greg.isAlive.should.be.false; // 1hp
      });

      it('should never take health below zero', function() {
        var henry = new Spellcaster('Henry', 300, 125);
        henry.inflictDamage(henry.health + 1);
        henry.health.should.equal(0);
        henry.isAlive.should.be.false; // 0hp
      });
    });

    describe('.spendMana', function() {
      it('should be a function', function() {
        var iris = new Spellcaster('Iris', 300, 125);
        expect(iris.spendMana).to.be.a('function');
      });

      it('should be able to spend mana if it has enough', function() {
        var jane = new Spellcaster('Jane', 300, 125),
            fullMana = jane.mana;
        expect(jane.spendMana(jane.mana - 1)).to.be.true;
        jane.mana.should.be.below(fullMana);
      });

      it('should not be able to spend more mana than the current amount', function() {
        var karl = new Spellcaster('Karl', 300, 125);
        var totalMana = karl.mana;
        expect(karl.spendMana(karl.mana + 1)).to.be.false;
        karl.mana.should.equal(totalMana);
      });
    });

    describe('.invoke', function() {
      it('should be called with a Spell as the first parameter', function() {
        var loren = new Spellcaster('Loren', 300, 125);
        var gust = new Spell('Gust', loren.mana, 'Creates a gentle breeze.');
        expect(loren.invoke()).to.be.false;
        expect(loren.invoke(null)).to.be.false;
        expect(loren.invoke(gust)).to.be.true;
      });

      it ('should spend mana to cast the spell', function() {
        var loren = new Spellcaster('Loren', 300, 125),
            gust = new Spell('Gust', loren.mana, 'Creates a gentle breeze.');
            totalMana = loren.mana;
        expect(loren.invoke(gust)).to.be.true;
        expect(loren.mana).to.equal(totalMana - gust.cost);
      });

      it('should not cast the spell if the Spellcaster does not have enough mana', function() {
        var loren = new Spellcaster('Loren', 300, 125),
            gust = new Spell('Gust', loren.mana + 1, 'Creates a gentle breeze.');
        expect(loren.invoke(gust)).to.be.false;
      });

      it('should target a Spellcaster if it is called with a DamageSpell', function() {
        var loren = new Spellcaster('Loren', 300, 125),
            forcePulse = new DamageSpell('Force Pulse', Math.floor(loren.mana/2), Math.floor(loren.mana/10), 'Strikes a foe with a powerful blast, knocking them to the ground.'),
            totalMana = loren.mana;
        expect(loren.invoke(forcePulse)).to.be.false;
        expect(loren.invoke(forcePulse, loren)).to.be.true;
      });

      it('should only spend mana if the DamageSpell was succesfully invoked', function() {
        var loren = new Spellcaster('Loren', 300, 125),
          forcePulse = new DamageSpell('Force Pulse', Math.floor(loren.mana/2), Math.floor(loren.mana/10), 'Strikes a foe with a powerful blast, knocking them to the ground.');
        expect(loren.invoke(forcePulse, null)).to.be.false;
        expect(loren.mana).to.equal(totalMana);
        expect(loren.invoke(forcePulse, loren)).to.be.true;
        expect(loren.mana).to.equal(totalMana - forcePulse.cost);
      });

      it('should not deal damage if the DamageSpell was not successfully invoked', function() {
        var loren = new Spellcaster('Loren', 300, 125),
          morty = new Spellcaster('Morty', 300, 125),
          expensivePulse = new DamageSpell('Force Pulse', loren.mana + 1, Math.floor(loren.mana/10), 'Strikes a foe with a powerful blast, knocking them to the ground.'),
          forcePulse = new DamageSpell('Force Pulse', Math.floor(loren.mana/2), Math.floor(loren.mana/10), 'Strikes a foe with a powerful blast, knocking them to the ground.'),
          mortyHealth = morty.health,
          mortyMana = morty.mana,
          lorenHealth = loren.health,
          lorenMana = loren.mana;
        (loren.invoke(expensivePulse, morty)).should.be.false;
        loren.mana.should.equal(lorenMana);
        loren.health.should.equal(lorenHealth);
        morty.mana.should.equal(mortyMana);
        morty.health.should.equal(mortyHealth);
      });

      it('should deal damage to target only if DamageSpell is successfully invoked', function(){
        var loren = new Spellcaster('Loren', 300, 125),
            morty = new Spellcaster('Morty', 300, 125),
            expensivePulse = new DamageSpell('Force Pulse', loren.mana + 1, Math.floor(loren.mana/10), 'Strikes a foe with a powerful blast, knocking them to the ground.'),
            forcePulse = new DamageSpell('Force Pulse', Math.floor(loren.mana/2), Math.floor(loren.mana/10), 'Strikes a foe with a powerful blast, knocking them to the ground.'),
            mortyHealth = morty.health,
            mortyMana = morty.mana,
            lorenHealth = loren.health,
            lorenMana = loren.mana;
        (loren.invoke(forcePulse, morty)).should.be.true;
        loren.mana.should.equal(lorenMana - forcePulse.cost);
        loren.health.should.equal(lorenHealth);
        morty.mana.should.equal(mortyMana);
        morty.health.should.equal(mortyHealth - forcePulse.damage);
      });
    });

  });

});

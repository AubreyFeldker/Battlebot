module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  // Define characters and jobs arrays
  const characters = ['Mario', 'Luigi', 'Bowser', 'Peach', 'Yoshi', 'E. Gadd', 'the Koopalings', 'Toad', 'Toadette', 'Cappy', 'Rosalina', 'Boo', 'Goomba', 'Koopa Troopa', 'Koopa the Quick', 'Donkey Kong', 'Daisy', 'Wario', 'Waluigi', 'Shy Guy', 'Chargin Chuck', 'Pyoro', 'Beaoro', 'Bayonetta', 'King K. Rool', 'Funky Kong', 'The Chimp', 'The Champ', 'Cranky Kong', 'Rabbid Peach', 'Judge Pianta', 'Plessie', 'King Augustus Septemberus Octoberus Koopa', 'Jr. Troopa', 'Wart', 'King Boo', 'Ninji', 'Pauline', 'Tiara', 'the Broodals', 'Jack Black', 'Foreman Spike', 'Diddy Kong', 'Dixie Kong', 'Whomp', 'Pidgit', 'Gooper Blooper', 'Scuttlebug', 'Nabbit\'s Ghost'];
  const jobs = ['Personal Chef', 'Minion', 'Bodyguard', 'Lawyer', 'Assistant', 'Babysitter', 'Personal Maid', 'Mailman', 'Driver', 'Gardener', 'Lawn-Mower', 'Consultant', 'Copyright Lawyer', 'Player 2', 'Trash Collector', 'Hair Stylist', 'Pet Sitter', 'Hitman', 'Therapist', 'Tour Guide', 'Photographer', 'Jester', 'Partner in Crime', 'DJ'];

  // Get a random character and job
  const rChar = Math.floor(Math.random() * characters.length);
  const rJob = Math.floor(Math.random() * jobs.length);

  // Create final string and get output from pre-built work function
  const final = `${characters[rChar]}'s ${jobs[rJob]}`;
  const output = await eco.ecoWork(message.author.id, {
    failurerate: 20, // Failure rate of 20%
    money: Math.floor(Math.random() * 4996) + 5, // Random money output between 5 and 5000
    jobs: [],
  });

  // If work failed, error on failed
  if (output.earned === 0) {
    return message.error(`You Failed as ${final}!`, `**${message.member.displayName}**, You failed as \`${final}\` and earned nothing!`);
  }

  // Display success message with appropriate strings and calculations
  return message.success(`You Successfully Worked as ${final}!`, `**${message.member.displayName}**, You worked as \`${final}\` and earned ${starbits} \`${output.earned} starbits\`! \nYou now own ${starbits} \`${output.newBalance} starbits\`!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['w'],
  permLevel: 'User',
  cooldown: 3600,
};

module.exports.help = {
  name: 'work',
  category: 'economy',
  description: 'Earns you starbits by working various jobs. Gives you 5-5000 starbits randomly. Has a failure rate of 20%',
  usage: 'work',
};

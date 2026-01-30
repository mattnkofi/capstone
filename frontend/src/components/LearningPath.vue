<template>
  <div class="relative w-full h-[600px] bg-[#F0F4FF] rounded-[40px] overflow-hidden shadow-inner p-10">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="absolute top-10 right-40 group cursor-pointer">
        <div class="bg-[#00D4FF] p-1 rounded-full shadow-lg group-hover:scale-110 transition">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=module1" class="w-16 h-16" />
        </div>
        <div class="mt-2 bg-white px-3 py-1 rounded-full shadow-sm">
          <p class="text-[10px] font-bold text-slate-600">Module 1: GAD Basics</p>
        </div>
      </div>

      <div class="absolute bottom-20 left-20 group cursor-pointer">
        <div class="bg-[#FF7EB3] p-1 rounded-full shadow-lg group-hover:scale-110 transition border-4 border-white">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=vawc" class="w-16 h-16" />
        </div>
        <div class="mt-2 bg-white px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
          <span class="text-green-500 text-[10px]">✔</span>
          <p class="text-[10px] font-bold text-slate-600">VAWC Prevention</p>
        </div>
      </div>
      
      <svg class="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M600,80 Q450,150 400,300 T150,500" fill="none" stroke="#A5B4FC" stroke-width="40" stroke-linecap="round" opacity="0.4" />
      </svg>
    </div>
  </div>
</template>
function Vector(x,y,z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}


K = 1;
N = 8;
vectors= new Array(N);
vectors[0] = new Vector(1,1,1);
vectors[1] = new Vector(6,6-K,1);
vectors[2] = new Vector(11,1,1);
vectors[3] = new Vector(6+K,6,1);
vectors[4] = new Vector(11,11,1);
vectors[5] = new Vector(6,6+K,1);
vectors[6] = new Vector(1,11,1);
vectors[7] = new Vector(6-K,6,1);


normal = new Vector(0,0,0);

//calc normal vector of polygon
for(i =0; i < N;i++)
{
	var j = (i + 1) % N;  
	normal.x += (vectors[i].y - vectors[j].y)*(vectors[i].z+vectors[j].z);
	normal.y += (vectors[i].z - vectors[j].z)*(vectors[i].x+vectors[j].x);
	normal.z += (vectors[i].x - vectors[j].x)*(vectors[i].y+vectors[j].y);
}
console.log(normal);
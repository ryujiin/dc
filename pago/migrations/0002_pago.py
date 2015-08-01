# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pago', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('id_pago', models.CharField(max_length=100, null=True, blank=True)),
                ('fecha', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('metodo_pago', models.ForeignKey(blank=True, to='pago.MetodoPago', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
